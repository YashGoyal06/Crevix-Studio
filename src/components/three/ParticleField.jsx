import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const seededRandom = (seed) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const Particles = ({ count = 800 }) => {
  const mesh = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color('#FFFFFF');
    const c2 = new THREE.Color('#6D28D9');
    const c3 = new THREE.Color('#BE185D');

    for (let i = 0; i < count; i++) {
      const theta = seededRandom(i + 1) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i + 101) - 1);
      const r = 6 + seededRandom(i + 201) * 4;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const rand = seededRandom(i + 301);
      const chosen = rand < 0.7 ? c1 : rand < 0.9 ? c2 : c3;
      col[i * 3]     = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }
    return [pos, col];
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.001;
    mesh.current.rotation.x += 0.0003;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={count} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const ParticleField = () => (
  <Canvas camera={{ position: [0, 0, 12], fov: 60 }} gl={{ alpha: true, antialias: false }}>
    <ambientLight intensity={0.2} />
    <Particles />
  </Canvas>
);
