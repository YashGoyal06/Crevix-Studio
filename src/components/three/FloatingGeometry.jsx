import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const FloatingMesh = ({ position, rotation, color, speed = 0.3, shape = 'box' }) => {
  const mesh = useRef();
  const offset = useRef((position[0] * 1.7 + position[1] * 2.3 + position[2] * 0.9) * Math.PI);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.x += 0.004 * speed;
    mesh.current.rotation.y += 0.006 * speed;
    mesh.current.position.y = position[1] + Math.sin(t * speed + offset.current) * 0.3;
  });

  return (
    <mesh ref={mesh} position={position} rotation={rotation}>
      {shape === 'box'   && <boxGeometry args={[0.8, 0.8, 0.8]} />}
      {shape === 'torus' && <torusGeometry args={[0.5, 0.18, 16, 40]} />}
      {shape === 'octa'  && <octahedronGeometry args={[0.6, 0]} />}
      <meshPhysicalMaterial
        color={color}
        metalness={0.8}
        roughness={0.15}
        clearcoat={0.8}
        transparent
        opacity={0.75}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
};

export const FloatingGeometry = () => (
  <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: true, antialias: true }} style={{ pointerEvents: 'none' }}>
    <ambientLight intensity={0.1} />
    <pointLight color="#6D28D9" intensity={5} position={[-3, 3, 3]} />
    <pointLight color="#BE185D" intensity={3} position={[3, -2, 2]} />
    <pointLight color="#EA580C" intensity={2} position={[0, -3, 5]} />

    <FloatingMesh position={[-2.5, 0.5, 0]} rotation={[0.5, 0.3, 0]}  color="#6D28D9" speed={0.4} shape="box"   />
    <FloatingMesh position={[2.2, -0.5, -1]} rotation={[0.2, 0.8, 0]} color="#BE185D" speed={0.3} shape="torus" />
    <FloatingMesh position={[0, 1.5, -2]}   rotation={[0.7, 0.1, 0.4]} color="#EA580C" speed={0.5} shape="octa"  />
    <FloatingMesh position={[-1.5, -1.5, 0]} rotation={[0.3, 0.5, 0]} color="#6D28D9" speed={0.25} shape="octa" />
    <FloatingMesh position={[1.8, 1.2, -1]} rotation={[0.1, 0.4, 0.6]} color="#BE185D" speed={0.35} shape="box"  />
  </Canvas>
);
