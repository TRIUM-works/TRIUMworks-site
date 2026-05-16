'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import fragmentShader from './fragment.glsl';
import vertexShader from './vertex.glsl';
import { lerp } from '@/lib/utils';

function ShaderPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const target = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });
  const lastMove = useRef<number>(performance.now());
  const click = useRef({ x: 0.5, y: 0.5, intensity: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uClick: { value: new THREE.Vector3(0.5, 0.5, 0) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX / window.innerWidth;
      target.current.y = 1 - e.clientY / window.innerHeight;
      lastMove.current = performance.now();
    };
    const onClick = (e: PointerEvent) => {
      click.current.x = e.clientX / window.innerWidth;
      click.current.y = 1 - e.clientY / window.innerHeight;
      click.current.intensity = 1.0;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onClick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onClick);
    };
  }, []);

  useFrame((_, delta) => {
    if (!matRef.current) return;
    const now = performance.now();
    const idle = (now - lastMove.current) > 2000;

    // Mouse com lerp 0.05
    current.current.x = lerp(current.current.x, target.current.x, 0.05);
    current.current.y = lerp(current.current.y, target.current.y, 0.05);

    // Quando idle, mouse "respira" deslocando suavemente
    let mx = current.current.x;
    let my = current.current.y;
    if (idle) {
      mx += Math.sin(uniforms.uTime.value * 0.4) * 0.04;
      my += Math.cos(uniforms.uTime.value * 0.3) * 0.04;
    }
    uniforms.uMouse.value.set(mx, my);

    // Click decay
    click.current.intensity = Math.max(
      0,
      click.current.intensity - delta * 0.6
    );
    uniforms.uClick.value.set(
      click.current.x,
      click.current.y,
      click.current.intensity
    );

    uniforms.uTime.value += delta;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader as unknown as string}
        fragmentShader={fragmentShader as unknown as string}
      />
    </mesh>
  );
}

export default function HeroShader() {
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio || 1, 1.75));
  }, []);

  return (
    <Canvas
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      dpr={dpr}
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ShaderPlane />
    </Canvas>
  );
}
