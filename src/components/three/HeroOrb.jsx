import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Orb = ({ mousePos }) => {
  const mesh = useRef();
  const planeRef = useRef();
  const clock = useRef(new THREE.Clock());

  useFrame(() => {
    if (!mesh.current) return;
    const t = clock.current.getElapsedTime();
    mesh.current.rotation.y += 0.003;
    mesh.current.position.y = Math.sin(t * 0.5) * 0.15;

    // Subtle mouse parallax tilt
    const targetX = (mousePos.y / window.innerHeight - 0.5) * 0.28;
    const targetY = (mousePos.x / window.innerWidth  - 0.5) * 0.28;
    mesh.current.rotation.x += (targetX - mesh.current.rotation.x) * 0.05;
    mesh.current.rotation.z += (-targetY - mesh.current.rotation.z) * 0.05;
  });

  return (
    <group>
      {/* Main Icosahedron */}
      <mesh ref={mesh}>
        <icosahedronGeometry args={[2.5, 4]} />
        <meshPhysicalMaterial
          color="#0D0D0D"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.85}
          envMapIntensity={1}
        />
      </mesh>

      {/* Ground glow plane */}
      <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.8, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshBasicMaterial
          color="#6D28D9"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Lights */}
      <pointLight color="#6D28D9" intensity={4} position={[-4, 3, 2]} />
      <pointLight color="#BE185D" intensity={3} position={[4, -2, -2]} />
      <pointLight color="#EA580C" intensity={2} position={[0, -4, 4]} />
      <ambientLight intensity={0.1} />
    </group>
  );
};

export const HeroOrb = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: 'none' }}
    >
      <Orb mousePos={mousePos} />
    </Canvas>
  );
};
