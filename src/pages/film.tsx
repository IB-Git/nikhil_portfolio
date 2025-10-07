// File: src/pages/film.tsx

import { useState, useMemo } from 'react';
import Image from 'next/image';
import photoshootsData from '../../public/photoshoots.json'; 
import Lightbox from '@/components/lightbox';

// --- Helper function to flatten images for the Lightbox ---
const getAllImages = (data: typeof photoshootsData, categoryId: string): string[] => {
  const category = data.find(item => item.id === categoryId);
  if (!category || !category.photoshoots) return [];
  
  // Flattens all images from all photoshoots in this category into a single array
  return category.photoshoots.flatMap(shoot => shoot.images);
};

// --- Helper function to get Tailwind class based on image count ---
const getGridClass = (count: number) => {
  // Use 'lg:' prefix for big screen layout
  switch (count) {
    case 1:
      // 1 image: 100% width
      return 'lg:grid-cols-1';
    case 2:
      // 2 images: 50% width each
      return 'lg:grid-cols-2'; 
    case 3:
      // 3 images: 33.3% width each
      return 'lg:grid-cols-3'; 
    // Default to 4 columns for any other count, keeping consistent with Tailwind's small screen default
    default:
      return 'lg:grid-cols-4'; 
  }
};
// -----------------------------------------------------------------


const FilmPage = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Flattened array of ALL images in the 'film' category for the Lightbox
  const allImages: string[] = useMemo(() => {
    return getAllImages(photoshootsData, 'film'); 
  }, []);
  
  // Get the grouped photoshoot data
  const filmCategory = photoshootsData.find(item => item.id === 'film');
  // Check for the new 'photoshoots' array
  const photoshoots = filmCategory?.photoshoots || []; 

  const openLightbox = (imageURL: string) => {
    // Find the index of the clicked image in the flattened array
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
  // ---------------------------------------

  if (!photoshoots.length) {
    return <div className="text-center py-20 text-gray-500 text-xl">No film images found.</div>;
  }

  return (
    // Add vertical spacing between the photoshoot rows
    <div className="space-y-4 lg:space-y-8 p-4"> 
      {photoshoots.map((shoot) => {
        const imageCount = shoot.images.length;
        const gridClass = getGridClass(imageCount);

        // This container holds a single photoshoot row.
        return (
          <div 
            key={shoot.id} 
            // Default to 2 columns for small screens, and apply dynamic class for large screens (lg:)
            className={`grid grid-cols-2 gap-2 lg:gap-4 ${gridClass}`} 
          >
            {shoot.images.map((imageURL: string) => (
              <div 
                key={imageURL} 
                className="w-full min-h-0 cursor-pointer flex justify-center items-stretch" 
                onClick={() => openLightbox(imageURL)}
              >
                {/* Image Wrapper to maintain aspect ratio */}
                <div 
                  className="relative w-full h-auto" 
                  style={{ aspectRatio: '4/5' }} 
                >
                  <Image
                    src={imageURL}
                    alt={`Film Image ${imageURL}`}
                    layout="fill" 
                    objectFit="cover" // Use cover to fill the container and maintain ratio
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

export default FilmPage;