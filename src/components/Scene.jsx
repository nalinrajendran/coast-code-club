import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ScrollControls } from '@react-three/drei';
import { Clothing } from './Clothing';
import Overlay from './DevOverlay';
import { DevProvider } from './DevContext';

export default function Scene() {
  const [isDebugMode, setIsDebugMode] = useState(true);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'd') {
        setIsDebugMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <DevProvider>
      <Canvas
        camera={{
          fov: 35,
          position: [0, 0, 10],
        }}
        shadows
      >
        <ScrollControls pages={5} damping={0.25}>
          {/* Key lighting setup for clothing model */}
          <directionalLight
            position={[5, 10, 5]}
            intensity={0.9}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <directionalLight position={[-5, 8, -5]} intensity={0.6} />
          {/* lower ambient so base color is not washed out by uniform light */}
          <ambientLight intensity={0.25} />
          <pointLight position={[0, 5, 0]} intensity={0.35} />
          
          <Clothing debugMode={isDebugMode} />
        </ScrollControls>
        <Environment files={'./snowy_park_01_1k.hdr'} blur={0.5} />
      </Canvas>
      <Overlay isDebugMode={isDebugMode} />
    </DevProvider>
  );
}
