import React, { useLayoutEffect, useRef, useCallback, useEffect, useState } from 'react';
import { useGLTF, useScroll, Environment } from '@react-three/drei';
import gsap, { Power4 } from 'gsap';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDevInfo } from './DevContext';

export function Clothing({ debugMode, ...props }) {
  const { scene } = useGLTF('/sleeve.glb');
  const { scene: jacketSceneRaw } = useGLTF('/jacket.glb');
  const groupRef = useRef();
  const scrollControl = useScroll();
  const { setDebugInfo } = useDevInfo();
  const timeline = useRef();
  const lastUpdate = useRef(0);
  const currentTimeRef = useRef(0);
  const clonedSceneRef = useRef(null);
  const clonedJacketRef = useRef(null);
  const [displayScene, setDisplayScene] = useState(null);
  const swappedRef = useRef(false);

  // helper to clone and color a raw scene
  const cloneAndColor = (srcScene, scaleMultiplier = 6) => {
    if (!srcScene) return null;
    const brandColor = 0xF7B980;
    const cloned = srcScene.clone();
    cloned.traverse((child) => {
      if (child.isMesh) {
        const newMaterial = new THREE.MeshStandardMaterial({
          color: brandColor,
          emissive: 0x5c3f2e,
          emissiveIntensity: 0.12,
          metalness: 0.0,
          roughness: 0.65,
          side: THREE.DoubleSide,
        });
        child.material = newMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
        child.scale.multiplyScalar(scaleMultiplier);
      }
    });
    return cloned;
  };

  // Apply materials and lighting to the model (initial sleeve)
  useEffect(() => {
    if (scene && !clonedSceneRef.current) {
      const clonedScene = cloneAndColor(scene, 6);
      clonedSceneRef.current = clonedScene;
      setDisplayScene(clonedScene);
    }
  }, [scene]);

  useLayoutEffect(() => {
    timeline.current = gsap.timeline({ defaults: { ease: Power4.easeInOut, duration: 2 } });

    let animationsData = [];

    // First Page - Welcome
    let firstPageAnimations = [
      {
        objectToAnimate: groupRef.current.rotation,
        properties: {
          y: Math.PI * 2,
          duration: 1,
        },
        timelinePoint: 1,
      },
      {
        objectToAnimate: groupRef.current.position,
        properties: {
          x: 0,
          y: 0,
          duration: 1,
        },
        timelinePoint: 1,
      },
      {
        objectToAnimate: '#welcome-section',
        properties: { opacity: 0, y: -50, duration: 0.5 },
        timelinePoint: 0.2,
      },
      {
        objectToAnimate: '#second-section',
        properties: { opacity: 1, x: 50, duration: 0.5 },
        timelinePoint: 1.5,
      },
    ];

    // Second Page - Collection 1
    let secondPageAnimations = [
      {
        objectToAnimate: groupRef.current.rotation,
        properties: {
          y: Math.PI * 4,
          duration: 1,
        },
        timelinePoint: 2.1,
      },
      {
        objectToAnimate: groupRef.current.position,
        properties: {
          x: 4,
          y: -1,
          duration: 1,
        },
        timelinePoint: 2,
      },
      {
        objectToAnimate: '#second-section',
        properties: { opacity: 0, x: 50, duration: 0.5 },
        timelinePoint: 1.8,
      },
      {
        objectToAnimate: '#third-section',
        properties: { opacity: 1, x: 0, duration: 0.5 },
        timelinePoint: 2.6,
      },
    ];

    // Third Page - Collection 2
    let thirdPageAnimations = [
      {
        objectToAnimate: groupRef.current.rotation,
        properties: {
          y: Math.PI * 6,
          duration: 1,
        },
        timelinePoint: 3,
      },
      {
        objectToAnimate: groupRef.current.position,
        properties: {
          x: -4,
          y: 1,
          duration: 1,
        },
        timelinePoint: 3,
      },
      {
        objectToAnimate: '#third-section',
        properties: { opacity: 0, x: -50, duration: 0.5 },
        timelinePoint: 2.9,
      },
    ];

    // Fourth Page - Collection 3
    let fourthPageAnimations = [
      {
        objectToAnimate: '#fourth-section',
        properties: { opacity: 1, x: 50, duration: 0.5 },
        timelinePoint: 3.3,
      },
      {
        objectToAnimate: '#fourth-section',
        properties: { opacity: 0, scale: 0.9 },
        timelinePoint: 5,
      },
    ];

    // Fifth Page - Contact
    let fifthPageAnimations = [
      {
        objectToAnimate: '#five-section',
        properties: { opacity: 1, y: 0 },
        timelinePoint: 5,
      },
      {
        objectToAnimate: groupRef.current.rotation,
        properties: {
          y: Math.PI * 2,
          duration: 1,
        },
        timelinePoint: 5,
      },
      {
        objectToAnimate: groupRef.current.position,
        properties: {
          x: 0,
          y: 0,
          duration: 1,
        },
        timelinePoint: 5,
      },
    ];

    animationsData = [
      ...animationsData,
      ...firstPageAnimations,
      ...secondPageAnimations,
      ...thirdPageAnimations,
      ...fourthPageAnimations,
      ...fifthPageAnimations,
    ];

    animationsData.forEach((animation) => {
      timeline.current.to(animation.objectToAnimate, { ...animation.properties }, animation.timelinePoint);
    });

    // After the Bold & Vibrant (third) page finishes appearing, transition to the jacket model
    // Schedule the swap slightly after timeline point 3 (third page) — use 3.6
    timeline.current.call(() => {
      // prepare jacket clone if not already
      if (!clonedJacketRef.current && jacketSceneRaw) {
        clonedJacketRef.current = cloneAndColor(jacketSceneRaw, 6);
      }
      if (clonedJacketRef.current) setDisplayScene(clonedJacketRef.current);
    }, null, 3.6);
  }, []);

  const updateDebugInfo = useCallback(
    (time) => {
      if (Date.now() - lastUpdate.current > 100) {
        setDebugInfo({
          timelinePoint: time.toFixed(2),
        });
        lastUpdate.current = Date.now();
      }
    },
    [setDebugInfo]
  );

  useFrame(() => {
    const currentTime = scrollControl.offset * timeline.current.duration();
    timeline.current.seek(currentTime);

    // Scroll-based fallback: swap to jacket after the second page (Timeless Basics)
    // With pages=5, each page ~0.2 offset; after second page threshold ~0.4
    try {
      const offset = scrollControl.offset;
      if (!swappedRef.current && offset > 0.4) {
        if (!clonedJacketRef.current && jacketSceneRaw) {
          // Use the raw jacket scene but scale it up 2x
          const jacketClone = jacketSceneRaw.clone();
          jacketClone.traverse((child) => {
            if (child.isMesh) {
              child.scale.multiplyScalar(5);
            }
          });
          clonedJacketRef.current = jacketClone;
        }
        if (clonedJacketRef.current) {
          setDisplayScene(clonedJacketRef.current);
          swappedRef.current = true;
        }
      }
    } catch (e) {
      // ignore if scrollControl not ready yet
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null} position={[0, 0, 1]} scale={1}>
      <primitive object={displayScene || clonedSceneRef.current || scene} />
    </group>
  );
}

useGLTF.preload('/sleeve.glb');
useGLTF.preload('/jacket.glb');
