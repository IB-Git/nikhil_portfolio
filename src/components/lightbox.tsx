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
  const [swipe, setSwipe] = useState(0);

  // Setup spring for image animation
  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: { tension: 200, friction: 30 }
  }));

  const currentImage = images[selectedImageIndex];

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setSwipe(touch.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const deltaX = touch.clientX - swipe;
    api.start({ x: deltaX });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - swipe;
    const threshold = 50;

    if (deltaX < -threshold) {
      onNext(); // Swipe left
    } else if (deltaX > threshold) {
      onPrev(); // Swipe right
    }
    api.start({ x: 0 }); // Reset position
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 text-white text-2xl z-10"
        style={{ 
          width: '50px', 
          height: '50px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
        aria-label="Previous Image"
      >
        &#8592;
      </button>
      <div className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center overflow-hidden">
        <animated.div
          style={{
            transform: x.to(x => `translateX(${x}px)`),
          }}
          className="relative w-full h-full"
        >
          <Image
            src={currentImage}
            alt="Lightbox Image"
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
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 text-white text-2xl z-10"
        style={{ 
          width: '50px', 
          height: '50px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
        aria-label="Next Image"
      >
        &#8594;
      </button>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl z-10"
        style={{ 
          width: '50px', 
          height: '50px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
        aria-label="Close Lightbox"
      >
        &times;
      </button>
    </div>
  );
};

export default Lightbox;

// import Image from 'next/image';
// import { useSpring, animated } from '@react-spring/web';

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
//   const [swipe, setSwipe] = useState(0);

//   // Setup spring for image animation
//   const [{ x }, api] = useSpring(() => ({
//     x: 0,
//     config: { tension: 180, friction: 20 } // Adjusted for stability
//   }));

//   const currentImage = images[selectedImageIndex];

//   const handleImageLoad = () => {
//     setLoaded(true);
//   };

//   const handleTouchStart = (e: React.TouchEvent) => {
//     const touch = e.touches[0];
//     setSwipe(touch.clientX);
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     const touch = e.touches[0];
//     const deltaX = touch.clientX - swipe;
//     api.start({ x: deltaX });
//   };

//   const handleTouchEnd = (e: React.TouchEvent) => {
//     const touch = e.changedTouches[0];
//     const deltaX = touch.clientX - swipe;
//     const threshold = 50; // Threshold for swipe

//     if (deltaX < -threshold) {
//       onNext(); // Swipe left
//     } else if (deltaX > threshold) {
//       onPrev(); // Swipe right
//     }
//     api.start({ x: 0 }); // Reset position
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white z-10"
//         style={{ 
//           width: '50px', 
//           height: '50px', 
//           fontSize: '2rem', // Larger text size for the close icon
//           display: 'flex', 
//           alignItems: 'center', 
//           justifyContent: 'center' 
//         }} // Adjust size for mobile
//       >
//         &times;
//       </button>
//       <button
//         onClick={onPrev}
//         className="absolute left-4 sm:left-5 text-white text-xl sm:text-3xl z-10"
//         style={{ 
//           width: '40px', 
//           height: '40px', 
//           display: 'flex', 
//           alignItems: 'center', 
//           justifyContent: 'center' 
//         }} // Adjust size for mobile
//       >
//         &#8592;
//       </button>
//       <animated.div
//         style={{
//           transform: x.to(x => `translateX(${x}px)`), // Subtle movement
//         }}
//         className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center"
//       >
//         <Image
//           src={currentImage}
//           alt="Selected Image"
//           layout="fill"
//           objectFit="contain"
//           placeholder="blur"
//           blurDataURL={currentImage} // Placeholder image URL
//           onLoad={handleImageLoad}
//           quality={80} // Use a balanced quality
//           className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
//         />
//       </animated.div>
//       <button
//         onClick={onNext}
//         className="absolute right-4 sm:right-5 text-white text-xl sm:text-3xl z-10"
//         style={{ 
//           width: '40px', 
//           height: '40px', 
//           display: 'flex', 
//           alignItems: 'center', 
//           justifyContent: 'center' 
//         }} // Adjust size for mobile
//       >
//         &#8594;
//       </button>
//     </div>
//   );
// };

// export default Lightbox;