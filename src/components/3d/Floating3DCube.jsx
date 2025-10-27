import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated 3D Cube Component
 */
const AnimatedCube = ({ color = '#8b5cf6' }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color={color}
        metalness={0.6}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

/**
 * Floating 3D Cube Container
 */
const Floating3DCube = ({ 
  width = 300, 
  height = 300, 
  color = '#8b5cf6',
  enableControls = false 
}) => {
  return (
    <div style={{ width, height }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <AnimatedCube color={color} />
        {enableControls && <OrbitControls enableZoom={false} />}
      </Canvas>
    </div>
  );
};

export default Floating3DCube;

