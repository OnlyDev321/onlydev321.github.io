import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
/*  Named imports only — `import * as THREE from 'three'` does not tree-shake
 *  reliably and pulls in the entire library (~600 kB). Importing the three
 *  classes we actually use keeps this chunk lean. */
import { Color, ShaderMaterial, Vector2 } from 'three'

/* -------------------------------------------------------------------------- *
 *  HERO AMBIENT — single fullscreen quad, fragment-shader-driven.            *
 *                                                                            *
 *  Why a shader, not particles or a mesh:                                    *
 *   - One draw call, no geometry beyond the unit quad.                       *
 *   - All work happens on the GPU; the JS main thread is not touched.        *
 *   - The ambient drift is a flow-noise field — feels like depth + light,    *
 *     never reads as a "thing on the page" that competes with the H1.        *
 *                                                                            *
 *  Performance contract:                                                     *
 *   - Pauses (via `frameloop="demand"`) when off-screen.                     *
 *   - Hard caps DPR at 1.5 — visually identical, half the fragment work.     *
 *   - No `useState` inside `useFrame` (would trip React render every tick).  *
 *   - Shader does not use loops, branches, or texture lookups.               *
 *                                                                            *
 *  Fallback contract: callers render a CSS gradient layer and only mount     *
 *  this component on >=md viewports + when motion is allowed. See Hero.tsx.  *
 * -------------------------------------------------------------------------- */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

/*  Fragment shader — analytic flow noise, no texture, no branches.
 *  We sum two slow sin/cos fields to make a smooth flowing scalar, then map
 *  it to the brand cyan→violet ramp. A vignette and grain tame the edges.
 *
 *  Cost: ~30 ALU ops per pixel. Trivial for a modern GPU even at 4K.        */
const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform vec2  uResolution;
  uniform float uTime;
  uniform vec3  uColorA;   // cyan
  uniform vec3  uColorB;   // violet
  uniform vec3  uColorBg;  // deep ink
  uniform float uIntensity;

  /* Cheap 2D pseudo-noise — analytic, no lookups. */
  float n2(vec2 p) {
    return sin(p.x * 1.7 + cos(p.y * 1.3))
         + sin(p.y * 1.9 - cos(p.x * 0.8));
  }

  void main() {
    /* Aspect-correct UV in [-1,1]. */
    vec2 uv = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

    /* Two slow flows, layered. */
    float t = uTime * 0.06;
    float f1 = n2(uv * 1.4 + vec2( t,        t * 0.7));
    float f2 = n2(uv * 2.1 + vec2(-t * 0.8,  t * 0.4) + f1 * 0.35);

    float field = (f1 + f2) * 0.25 + 0.5;          // 0..1
    field = smoothstep(0.20, 0.95, field);

    /* Color ramp: bg → cyan → violet, modulated by field. */
    vec3 col = mix(uColorBg, uColorA, smoothstep(0.15, 0.55, field));
    col      = mix(col,       uColorB, smoothstep(0.55, 0.92, field));

    /* Soft radial vignette so the edges don't compete with the layout. */
    float r = length(uv);
    col *= smoothstep(1.45, 0.35, r);

    /* Hairline grain — kills banding on dark screens. Cheap. */
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.025;

    gl_FragColor = vec4(col * uIntensity, 1.0);
  }
`

interface FieldProps {
  paused: boolean
}

function Field({ paused }: FieldProps) {
  const matRef = useRef<ShaderMaterial>(null!)

  /* Uniforms object is *referentially stable* across renders — the same
     object is mutated each frame so React doesn't reconcile a new material. */
  const uniforms = useMemo(
    () => ({
      uTime:       { value: 0 },
      uResolution: { value: new Vector2(1, 1) },
      uColorA:     { value: new Color('#34d6f0') },  // Signal Cyan (accent)
      uColorB:     { value: new Color('#0e7a93') },  // deeper cyan — monochrome flow
      uColorBg:    { value: new Color('#070a12') },  // dark canvas
      uIntensity:  { value: 0.9 },
    }),
    [],
  )

  useFrame((state, delta) => {
    if (paused || !matRef.current) return
    const u = matRef.current.uniforms
    u.uTime.value += delta
    const size = state.size
    if (u.uResolution.value.x !== size.width || u.uResolution.value.y !== size.height) {
      u.uResolution.value.set(size.width, size.height)
    }
  })

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  )
}

/* -------------------------------------------------------------------------- */

export default function HeroAmbient() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const [docVisible, setDocVisible] = useState(
    typeof document === 'undefined' ? true : !document.hidden,
  )

  /* Pause when scrolled out of view OR when tab is hidden. The render loop
     is set to `demand`, so simply not advancing uTime is sufficient — but
     we also flip the canvas frameloop via key so r3f releases the rAF. */
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => setInView(e.isIntersecting)),
      { threshold: 0.01 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onVis = () => setDocVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const active = inView && docVisible

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden"
      /* The shader supplies its own background; this layer never paints CSS. */
      style={{ contain: 'strict' }}
    >
      <Canvas
        gl={{
          antialias: false,
          alpha: false,
          depth: false,
          stencil: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        frameloop={active ? 'always' : 'never'}
        camera={{ position: [0, 0, 1] }}
        flat
      >
        <Field paused={!active} />
      </Canvas>
    </div>
  )
}
