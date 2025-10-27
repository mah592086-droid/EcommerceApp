import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Simple 3D Product Box
 * (In production, you'd load actual 3D models)
 */
const ProductBox = ({ color = '#8b5cf6' }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.3}
          envMapIntensity={1}
        />
      </mesh>
      {/* Add some details */}
      <mesh position={[0, 0, 1.01]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
};

/**
 * 3D Product Viewer Component
 */
const Product3DViewer = ({ 
  width = '100%', 
  height = 400,
  color = '#8b5cf6'
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ width, height, position: 'relative' }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-gray-500">Loading 3D View...</div>
        </div>
      )}
      <Canvas onCreated={() => setLoading(false)}>
        <PerspectiveCamera makeDefault position={[4, 2, 4]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <ProductBox color={color} />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate={true}
          autoRotateSpeed={2}
        />
        <Environment preset="city" />
      </Canvas>
      <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default Product3DViewer;

