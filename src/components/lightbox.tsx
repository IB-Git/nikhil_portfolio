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

  // --- Touch Handlers ---
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
    const threshold = 50; // Threshold for swipe

    if (deltaX < -threshold) {
      onNext(); // Swipe left
    } else if (deltaX > threshold) {
      onPrev(); // Swipe right
    }
    api.start({ x: 0 }); // Reset position
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    },
    [onClose, onPrev, onNext]
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
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[100]"
    >

      <button
        onClick={onClose}
        className="absolute top-4 right-4 lg:top-6 lg:right-6 text-white text-3xl z-[110] p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
      >
        &times;
      </button>
      <button
        onClick={onPrev}
        className="absolute left-4 lg:left-6 text-white text-3xl z-[110] p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
      >
        &#8592;
      </button>
      
      {/* 3. Animated Image Container */}
      <animated.div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
      <button
        onClick={onNext}
        className="absolute right-4 lg:right-6 text-white text-3xl z-[110] p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Lightbox;