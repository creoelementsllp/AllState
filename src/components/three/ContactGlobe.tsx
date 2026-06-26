import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  const lat = (18.9284 * Math.PI) / 180;
  const lng = (72.8223 * Math.PI) / 180;
  const markerX = Math.cos(lat) * Math.cos(lng) * 1.02;
  const markerY = Math.sin(lat) * 1.02;
  const markerZ = Math.cos(lat) * Math.sin(lng) * 1.02;

  return (
    <group ref={groupRef}>
      <Sphere args={[1, 48, 48]}>
        <meshStandardMaterial
          color="#0F172A"
          roughness={0.6}
          metalness={0.3}
          wireframe={false}
        />
      </Sphere>
      <Sphere args={[1.01, 32, 32]}>
        <meshBasicMaterial color="#2563EB" wireframe transparent opacity={0.15} />
      </Sphere>
      <mesh position={[markerX, markerY, markerZ]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#38BDF8" />
      </mesh>
      <pointLight position={[markerX * 2, markerY * 2, markerZ * 2]} intensity={2} color="#38BDF8" distance={3} />
    </group>
  );
}

export default function ContactGlobe({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-full min-h-[320px] ${className}`} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={1} color="#FFFFFF" />
        <GlobeMesh />
      </Canvas>
    </div>
  );
}
