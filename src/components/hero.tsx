import Image from 'next/image';
import heroImage from '../../public/hero.jpg';

const Hero = () => {
  return (
    <div className="flex justify-center items-center h-screen mt-10"> {/* mt-10 adds margin to the top */}
      <div className="w-full max-w-2xl">
        <Image
          src={heroImage}
          alt="Hero Image"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Hero;