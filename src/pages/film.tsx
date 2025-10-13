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


const FilmPage = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const photoshoots = useMemo(() => {
    const filmCategory = photoshootsData.find(item => item.id === 'film');
    return filmCategory && 'photoshoots' in filmCategory ? filmCategory.photoshoots : [];
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
    return <div className="text-center py-20 text-gray-500 text-xl">No film images found.</div>;
  }

  return (
    <div className="space-y-8 lg:space-y-48 p-4"> 
      {photoshoots.map((shoot) => {
        const imageCount = shoot.images.length;
        const gridClass = getGridClass(imageCount);

        return (
          <div 
            key={shoot.id} 
            className={`grid grid-cols-2 gap-2 lg:gap-4 items-center ${gridClass}`} 
          >
            {shoot.images.map((imageURL: string) => (
              <div 
                key={imageURL} 
                className="w-full cursor-pointer" 
                onClick={() => openLightbox(imageURL)}
              >
                  <Image
                    src={imageURL}
                    alt={`Film Image ${imageURL}`}
                    width={1000}
                    height={1000}
                    layout="responsive"
                    objectFit="contain"
                    className="transition-opacity duration-300" 
                    loading="lazy" 
                    quality={80}
                  />
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

export default FilmPage;