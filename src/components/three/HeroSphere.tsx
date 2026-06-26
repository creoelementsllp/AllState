import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function IndustrialSphereMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1.8, 64, 64]}>
        <MeshDistortMaterial
          color="#2563EB"
          emissive="#1D4ED8"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={2}
        />
      </Sphere>
      <Sphere args={[2.1, 32, 32]}>
        <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.08} />
      </Sphere>
    </Float>
  );
}

export default function HeroSphere({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#38BDF8" />
        <pointLight position={[-5, -3, 2]} intensity={0.8} color="#2563EB" />
        <IndustrialSphereMesh />
      </Canvas>
    </div>
  );
}
