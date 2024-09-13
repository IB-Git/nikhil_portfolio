import { useEffect } from 'react';
import Image from 'next/image';

interface LightboxProps {
  images: string[];
  selectedImageIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = ({
  images,
  selectedImageIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-3xl"
      >
        &times;
      </button>

      {/* Previous Button */}
      <button
        onClick={onPrev}
        className="absolute left-5 text-white text-3xl"
      >
        &#8592;
      </button>

      {/* Image Display */}
      <div className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center">
        <Image
          src={images[selectedImageIndex]}
          alt="Selected Image"
          layout="fill" // Fill the container and scale down with object-fit
          objectFit="contain" // Maintains aspect ratio
          className="p-4"
        />
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="absolute right-5 text-white text-3xl"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Lightbox;
