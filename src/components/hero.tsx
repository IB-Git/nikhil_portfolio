// import Image from 'next/image';
// import heroImage from '../../public/hero.jpg';

// const Hero = () => {
//   return (
//     <div className="flex justify-center items-center h-screen mt-10"> {/* mt-10 adds margin to the top */}
//       <div className="w-full max-w-2xl">
//         <Image
//           src={heroImage}
//           alt="Hero Image"
//           className="w-full h-auto"
//         />
//       </div>
//     </div>
//   );
// };

// export default Hero;

import Image from 'next/image';
import heroImage from '../../public/hero.jpg';

const Hero = () => {
  const aspectRatio = 3 / 2;
  const maxWidthPercentage = 80;
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const maxWidth = (maxWidthPercentage / 100) * screenWidth;
  const height = maxWidth / aspectRatio;

  return (
    <div className="max-w-screen-xl mx-auto">
      <section className="h-auto mx-auto lg:py-8 pb-2 flex">
        <div className="w-full lg:w-2/3 mx-auto">
          <Image
            src={heroImage}
            alt="Hero Image"
            className="w-full h-auto object-cover mx-auto my-auto px-4 lg:px-0"
            width={maxWidth}
            height={height}
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;