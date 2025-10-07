import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSpring, animated } from '@react-spring/web';

interface LightboxProps {
  images: string[];
  selectedImageIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  selectedImageIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) => {
  const [loaded, setLoaded] = useState(false);
  const [swipeStart, setSwipeStart] = useState(0); 

  // Setup spring for image animation
  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: { tension: 180, friction: 20 }
  }));

  const currentImage = images[selectedImageIndex];

  const handleImageLoad = () => {
    setLoaded(true);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setSwipeStart(touch.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const deltaX = touch.clientX - swipeStart;
    api.start({ x: deltaX });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - swipeStart;
    const threshold = 50; 

    if (deltaX < -threshold) {
      onNext();
    } else if (deltaX > threshold) {
      onPrev();
    }
    api.start({ x: 0 }); 
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown as any);
    document.body.style.overflow = 'hidden'; 

    return () => {
      document.removeEventListener('keydown', handleKeyDown as any);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  if (!currentImage) return null;

  return (
    <div
      // Added min-h-screen to ensure it covers 100% of the viewport height
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[100] min-h-screen"
      // Added a subtle click handler to close the lightbox when clicking outside the image
      onClick={onClose}
    >
        {/* CLOSE BUTTON (X) - Top Right - Clean Styling */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 lg:top-6 lg:right-6 text-white text-4xl z-[110] p-4 font-bold hover:opacity-70 transition"
      >
        &times;
      </button>
      
      {/* Animated Image Container - We stop the click event from closing the lightbox here */}
      <animated.div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: x.to(x => `translateX(${x}px)`), 
        }}
        className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center p-4" 
      >
        <Image
          src={currentImage}
          alt="Selected Image"
          layout="fill"
          objectFit="contain"
          placeholder="blur"
          blurDataURL={currentImage} 
          onLoad={handleImageLoad}
          quality={80} 
          className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </animated.div>
    </div>
  );
};

export default Lightbox;