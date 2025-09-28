import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';

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
}) => {
  // Handle keyboard navigation for desktop users
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        onPrev();
      } else if (event.key === 'ArrowRight') {
        onNext();
      }
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden'; 

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  const currentImage = images[selectedImageIndex];

  if (!currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 cursor-pointer"
      onClick={onClose}
    >
      {/* Container for image and controls */}
      <div 
        className="relative flex items-center justify-center w-full h-full p-4 md:p-8"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          className="absolute left-4 lg:left-8 z-10 p-2 text-white bg-gray-800 bg-opacity-50 rounded-full lg:flex items-center justify-center hidden hover:bg-opacity-75 transition-colors duration-200" // 💥 FIX: Hidden on mobile, flex on large screens 💥
          onClick={onPrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Current Image */}
        <div className="relative w-full h-full max-w-full max-h-full">
          <Image
            src={currentImage}
            alt={`Lightbox image ${selectedImageIndex + 1}`}
            layout="fill"
            objectFit="contain" // Ensures the entire image is visible
            className="w-full h-full"
          />
        </div>

        {/* Next Button (Desktop only) */}
        <button
          className="absolute right-4 lg:right-8 z-10 p-2 text-white bg-gray-800 bg-opacity-50 rounded-full lg:flex items-center justify-center hidden hover:bg-opacity-75 transition-colors duration-200" // 💥 FIX: Hidden on mobile, flex on large screens 💥
          onClick={onNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Close Button (Desktop only) */}
        <button
          className="absolute top-4 right-4 lg:top-8 lg:right-8 z-10 p-2 text-white bg-gray-800 bg-opacity-50 rounded-full lg:flex items-center justify-center hidden hover:bg-opacity-75 transition-colors duration-200" // 💥 FIX: Hidden on mobile, flex on large screens 💥
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Lightbox;