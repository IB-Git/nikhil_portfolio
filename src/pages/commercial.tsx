import { useState, useMemo } from 'react';
import Image from 'next/image';
import photoshootsData from '../../public/photoshoots.json'; 
import Lightbox from '@/components/lightbox';

// The interface can be simplified too, but we keep it minimal for compatibility
interface Photoshoot {
  images: string[];
}

const CommercialPage = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images: string[] = useMemo(() => {
    return photoshootsData[0]?.images || []; 
  }, []);
  
  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  // ---------------------------------------

  if (!images.length) {
    return <div className="text-center py-20 text-gray-500 text-xl">No commercial images found.</div>;
  }

  return (
    <div> 
      <div className="grid grid-cols-2 gap-4 lg:gap-6"> 
        {images.map((image: string, index: number) => (
          <div 
            key={index} 
            className="w-full min-h-0 max-h-[90vh] cursor-pointer group flex justify-center items-center" 
            onClick={() => openLightbox(index)}
          >
            <div className="relative w-full h-auto" style={{ aspectRatio: '4/5' }}>
              <Image
                src={image}
                alt={`Commercial Image ${index}`}
                layout="fill" 
                objectFit="contain" // Ensures no cropping
                className="w-full h-full transition-opacity duration-300" 
                loading="lazy" 
                quality={80}
              />
            </div>
          </div>
        ))}
      </div>

      {isLightboxOpen && (
        <Lightbox
          images={images}
          selectedImageIndex={selectedImageIndex}
          onClose={closeLightbox}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
        />
      )}
    </div>
  );
};

export default CommercialPage;