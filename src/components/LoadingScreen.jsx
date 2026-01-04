import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ isLoading }) {
  const [displayLoading, setDisplayLoading] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      // Add a small delay before hiding to ensure smooth transition
      const timer = setTimeout(() => setDisplayLoading(false), 300);
      return () => clearTimeout(timer);
    } else {
      setDisplayLoading(true);
    }
  }, [isLoading]);

  if (!displayLoading) return null;

  return (
    <div className={`loading-screen ${!isLoading ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <h1 className="loading-title font-syncopate">
          Coast Code Club
        </h1>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <p className="loading-text font-outfit">Loading your experience...</p>
      </div>
    </div>
  );
}
