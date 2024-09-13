import { useState } from 'react';
import Image from 'next/image';
import { useSpring, animated } from '@react-spring/web';

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

  // Define the spring for swipe animation
  const [{ x }, setSpring] = useSpring(() => ({
    x: 0,
    config: { tension: 150, friction: 30 } // Adjust tension and friction here
  }));

  // Define the current image
  const currentImage = images[selectedImageIndex];

  // Handle swipe gestures
  const handleSwipe = (e: TouchEvent) => {
    const touch = e.changedTouches[0];
    const swipeDistance = touch.clientX;

    if (swipeDistance < 0) {
      onNext();
    } else {
      onPrev();
    }
  };

  const handleImageLoad = () => {
    setLoaded(true);
  };

  // Attach touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handleSwipe(e.nativeEvent);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
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
      <animated.div
        style={{
          transform: x.to(x => `translateX(${x}px)`)
        }}
        className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center"
      >
        <Image
          src={currentImage}
          alt="Selected Image"
          layout="fill"
          objectFit="contain"
          placeholder="blur"
          blurDataURL={currentImage} // Placeholder image URL, replace with an actual low-res image if needed
          onLoad={handleImageLoad}
          quality={80} // Use a balanced quality to avoid performance hits
          className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </animated.div>
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