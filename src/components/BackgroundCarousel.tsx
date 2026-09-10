import React, { useState, useEffect } from 'react';

export const BACKGROUND_IMAGES: string[] = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=80'
];

export const BackgroundCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload all 10 images into browser cache so transitions are instantaneous
  useEffect(() => {
    BACKGROUND_IMAGES.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // Auto-rotate background image every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 2000); // 2-second interval

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* 10 Background Images rendered with <img> tags and no-referrer policy */}
      {BACKGROUND_IMAGES.map((imgUrl, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={imgUrl}
            alt=""
            referrerPolicy="no-referrer"
            loading="eager"
            className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-7000 ease-out"
          />
        </div>
      ))}

      {/* Clean luxury overlay so the background architectural images are vivid and clearly visible */}
      <div className="absolute inset-0 z-20 bg-black/35 pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none" />
    </div>
  );
};
