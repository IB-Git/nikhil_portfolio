import { useEffect, useRef, useState } from 'react';
import Hammer from 'hammerjs';
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
  const imageRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imageRef.current) {
      const hammer = new Hammer(imageRef.current);

      // Enable touch gestures
      hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });

      hammer.on('swipeleft', () => {
        onNext();
      });

      hammer.on('swiperight', () => {
        onPrev();
      });

      return () => {
        hammer.off('swipeleft');
        hammer.off('swiperight');
      };
    }
  }, [onNext, onPrev]);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const currentImage = images[selectedImageIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white text-xl sm:text-3xl"
      >
        &times;
      </button>
      <button
        onClick={onPrev}
        className="absolute left-4 sm:left-5 text-white text-xl sm:text-3xl"
      >
        &#8592;
      </button>
      <div
        ref={imageRef}
        className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center"
      >
        <Image
          src={currentImage}
          alt="Selected Image"
          layout="fill"
          objectFit="contain"
          placeholder="blur"
          blurDataURL={currentImage} // Placeholder image URL
          onLoad={handleImageLoad}
          quality={80} // Use a balanced quality to avoid performance issues
          className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <button
        onClick={onNext}
        className="absolute right-4 sm:right-5 text-white text-xl sm:text-3xl"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Lightbox;


// import { useState, useEffect } from 'react';
// import Image from 'next/image';

// interface LightboxProps {
//   images: string[];
//   selectedImageIndex: number;
//   onClose: () => void;
//   onPrev: () => void;
//   onNext: () => void;
// }

// const Lightbox = ({
//   images,
//   selectedImageIndex,
//   onClose,
//   onPrev,
//   onNext,
// }: LightboxProps) => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') {
//         onClose();
//       } else if (e.key === 'ArrowLeft') {
//         onPrev();
//       } else if (e.key === 'ArrowRight') {
//         onNext();
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [onClose, onPrev, onNext]);

//   const handleImageLoad = () => {
//     setLoaded(true);
//   };

//   const currentImage = images[selectedImageIndex];

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white text-xl sm:text-3xl"
//       >
//         &times;
//       </button>
//       <button
//         onClick={onPrev}
//         className="absolute left-4 sm:left-5 text-white text-xl sm:text-3xl"
//       >
//         &#8592;
//       </button>
//       <div className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center">
//         <Image
//           src={currentImage}
//           alt="Selected Image"
//           layout="fill"
//           objectFit="contain"
//           placeholder="blur"
//           blurDataURL={currentImage} // Placeholder image URL, replace with an actual low-res image if needed
//           onLoad={handleImageLoad}
//           quality={80} // Use a balanced quality to avoid performance hits
//           className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
//         />
//       </div>
//       <button
//         onClick={onNext}
//         className="absolute right-4 sm:right-5 text-white text-xl sm:text-3xl"
//       >
//         &#8594;
//       </button>
//     </div>
//   );
// };

// export default Lightbox;