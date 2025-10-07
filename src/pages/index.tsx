import { useState, useMemo } from 'react';
import Image from 'next/image';
import photoshootsData from '../../public/photoshoots.json'; 
import Lightbox from '@/components/lightbox';

const getGridClass = (count: number) => {
  switch (count) {
    case 1:
      return 'lg:grid-cols-1';
    case 2:
      return 'lg:grid-cols-2'; 
    case 3:
      return 'lg:grid-cols-3'; 
    default:
      return 'lg:grid-cols-4'; 
  }
};


const Home = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const photoshoots = useMemo(() => {
    const digitalCategory = photoshootsData.find(item => item.id === 'digital');
    return digitalCategory && 'photoshoots' in digitalCategory ? digitalCategory.photoshoots : [];
  }, []);

  const allImages: string[] = useMemo(() => {
    return photoshoots.flatMap(shoot => shoot.images);
  }, [photoshoots]);

  const openLightbox = (imageURL: string) => {
    const index = allImages.findIndex(img => img === imageURL);
    if (index !== -1) {
      setSelectedImageIndex(index);
      setIsLightboxOpen(true);
    }
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!photoshoots.length) {
    return <div className="py-20 text-center text-gray-500 text-xl">Personal stuff be here soon.</div>;
  }

  return (
    <div className="space-y-8 lg:space-y-32 p-4"> 
      {photoshoots.map((shoot) => {
        const imageCount = shoot.images.length;
        const gridClass = getGridClass(imageCount);

        return (
          <div 
            key={shoot.id} 
            className={`grid grid-cols-2 gap-2 lg:gap-4 ${gridClass}`} 
          >
            {shoot.images.map((imageURL: string) => (
              <div 
                key={imageURL} 
                className="w-full min-h-0 cursor-pointer flex justify-center items-stretch" 
                onClick={() => openLightbox(imageURL)}
              >
                <div 
                  className="relative w-full h-auto" 
                  style={{ aspectRatio: '4/5' }} 
                >
                  <Image
                    src={imageURL}
                    alt={`Digital Image ${imageURL}`}
                    layout="fill" 
                    objectFit="cover"
                    className="w-full h-full transition-opacity duration-300" 
                    loading="lazy" 
                    quality={80}
                  />
                </div>
              </div>
            ))}
          </div>
        );
      })}

      {allImages.length > 0 && isLightboxOpen && (
        <Lightbox
          images={allImages}
          selectedImageIndex={selectedImageIndex}
          onClose={closeLightbox}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
        />
      )}
    </div>
  );
};

export default Home;