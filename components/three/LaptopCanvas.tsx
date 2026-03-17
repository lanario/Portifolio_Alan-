'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, RoundedBox } from '@react-three/drei';
import { MotionValue, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LaptopCanvasProps {
  progress: MotionValue<number>;
  className?: string;
}

function LaptopCanvas({ progress, className }: LaptopCanvasProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className={cn('absolute inset-0 -z-10', className)} aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 1.2, 6], fov: 42 }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 3]} intensity={1.1} />
        <pointLight position={[-6, 2, 4]} intensity={0.6} />
        <LaptopModel progress={progress} />
      </Canvas>
    </div>
  );
}

interface LaptopModelProps {
  progress: MotionValue<number>;
}

function LaptopModel({ progress }: LaptopModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    return {
      chassis: new THREE.MeshStandardMaterial({
        color: '#0b1220',
        metalness: 0.65,
        roughness: 0.25,
      }),
      keyboard: new THREE.MeshStandardMaterial({
        color: '#060a12',
        metalness: 0.25,
        roughness: 0.7,
      }),
      screenFrame: new THREE.MeshStandardMaterial({
        color: '#0a0f1a',
        metalness: 0.55,
        roughness: 0.35,
      }),
      screen: new THREE.MeshStandardMaterial({
        color: '#0b1020',
        metalness: 0,
        roughness: 1,
        emissive: new THREE.Color('#1d4ed8'),
        emissiveIntensity: 0.25,
      }),
    };
  }, []);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;

    const p = THREE.MathUtils.clamp(progress.get(), 0, 1);
    const ease = p * p * (3 - 2 * p); // smoothstep

    const rotY = THREE.MathUtils.lerp(0.25, Math.PI * 1.15, ease);
    const rotX = THREE.MathUtils.lerp(-0.08, -0.6, ease);
    const posY = THREE.MathUtils.lerp(0.15, 1.7, ease);
    const posZ = THREE.MathUtils.lerp(0, -2.0, ease);
    const scale = THREE.MathUtils.lerp(1, 0.55, Math.max(0, (p - 0.65) / 0.35));

    g.rotation.set(rotX, rotY, 0);
    g.position.set(0, posY, posZ);
    g.scale.setScalar(scale);

    // Pequena oscilação “viva” sem depender do scroll
    const t = state.clock.getElapsedTime();
    g.rotation.z = Math.sin(t * 0.45) * 0.035;
  });

  return (
    <group ref={groupRef}>
      {/* Base */}
      <RoundedBox
        args={[3.6, 0.18, 2.4]}
        radius={0.12}
        smoothness={6}
        material={materials.chassis}
        position={[0, 0, 0]}
      />

      {/* Teclado (rebaixo) */}
      <RoundedBox
        args={[3.25, 0.06, 2.05]}
        radius={0.08}
        smoothness={6}
        material={materials.keyboard}
        position={[0, 0.08, 0]}
      />

      {/* Trackpad */}
      <RoundedBox
        args={[1.1, 0.04, 0.7]}
        radius={0.08}
        smoothness={6}
        material={materials.chassis}
        position={[0, 0.11, 0.65]}
      />

      {/* Tampa/screen */}
      <group position={[0, 0.15, -1.12]} rotation={[THREE.MathUtils.degToRad(-105), 0, 0]}>
        <RoundedBox
          args={[3.6, 0.16, 2.35]}
          radius={0.12}
          smoothness={6}
          material={materials.screenFrame}
        />

        {/* Tela */}
        <mesh position={[0, 0.09, 0]} rotation={[THREE.MathUtils.degToRad(90), 0, 0]}>
          <planeGeometry args={[3.25, 2.0]} />
          <primitive object={materials.screen} />
        </mesh>

        {/* Conteúdo na tela */}
        <Html
          transform
          occlude={false}
          position={[0, 0.095, 0.001]}
          rotation={[THREE.MathUtils.degToRad(90), 0, 0]}
          style={{ width: 520, height: 320 }}
        >
          <div
            className="h-full w-full rounded-xl border border-white/10 bg-black/70 backdrop-blur-md overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.6)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/[0.03]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              <span className="ml-2 text-[11px] text-white/70 tracking-wide">
                alan-barros • portfolio.tsx
              </span>
            </div>
            <pre className="p-4 text-[11px] leading-[1.55] text-white/85 whitespace-pre-wrap">
{`export function buildDigitalExperiences() {
  return {
    stack: ['Next.js', 'TypeScript', 'Supabase'],
    foco: ['Performance', 'SEO', 'DX'],
    entrega: 'Interfaces vivas com animação e precisão'
  };
}`}
            </pre>
          </div>
        </Html>
      </group>
    </group>
  );
}

export { LaptopCanvas };

