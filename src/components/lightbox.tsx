import { useState, useEffect } from 'react';
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
  const [loaded, setLoaded] = useState(false);

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
      <div className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center">
        <Image
          src={currentImage}
          alt="Selected Image"
          layout="fill"
          objectFit="contain"
          placeholder="blur"
          blurDataURL={currentImage} // Placeholder image URL, replace with an actual low-res image if needed
          onLoad={handleImageLoad}
          quality={80} // Use a balanced quality to avoid performance hits
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

// import { useEffect } from 'react';
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

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//       {/* Close Button */}
//       <button
//         onClick={onClose}
//         className="absolute top-5 right-5 text-white text-3xl"
//       >
//         &times;
//       </button>

//       {/* Previous Button */}
//       <button
//         onClick={onPrev}
//         className="absolute left-5 text-white text-3xl"
//       >
//         &#8592;
//       </button>

//       {/* Image Display */}
//       <div className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center">
//         <Image
//           src={images[selectedImageIndex]}
//           alt="Selected Image"
//           layout="fill" // Fill the container and scale down with object-fit
//           objectFit="contain" // Maintains aspect ratio
//           className="p-4"
//         />
//       </div>

//       {/* Next Button */}
//       <button
//         onClick={onNext}
//         className="absolute right-5 text-white text-3xl"
//       >
//         &#8594;
//       </button>
//     </div>
//   );
// };

// export default Lightbox;
