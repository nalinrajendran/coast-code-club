/* 
TODO: Add fallback instead of null

Reasons why we use Suspense:

Suspense helps us manage the asynchronous loading of components that wrap
In this case, it is necessary because we have 3D models, which need to load
textures, and also it is necessary to initialize Three.js

This is a good practice for UX

*/

import { Suspense, useEffect, useRef, useState } from 'react';
import './App.css';
import Scene from './components/Scene';
import Labels from './components/Labels';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const sceneContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a longer loading time (5 seconds) to ensure 3D models and HDR fully load
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    // Also check if page is fully loaded
    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(loadingTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercent = scrollHeight > 0 ? scrolled / scrollHeight : 0;

      // Hide on first page (0-15%) and last page (85-100%)
      const shouldHide = scrollPercent < 0.15 || scrollPercent > 0.85;

      if (sceneContainerRef.current) {
        if (shouldHide) {
          sceneContainerRef.current.classList.add('hidden-scene');
        } else {
          sceneContainerRef.current.classList.remove('hidden-scene');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="main-container">
      <LoadingScreen isLoading={isLoading} />
      <div ref={sceneContainerRef} className='scene_container'> 
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>
      <Labels />
    </div>
  );
}

export default App;