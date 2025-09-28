import { useState } from 'react';
import Lightbox from '@/components/lightbox';

const Home = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const images: string[] = []; 

  const closeLightbox = () => setIsLightboxOpen(false);

  // Home link shows empty content.
  return (
    <div> 
      
      {/* Show message */}
      <div className="py-20 text-center text-gray-500 text-xl">
        Personal stuff be here soon
      </div>

      {/* The empty grid structure */}
      <div className="grid grid-cols-2 gap-2 lg:gap-2"> 
        {/* The grid is empty, but the structure remains. */}
      </div>

      {isLightboxOpen && images.length > 0 && (
        <Lightbox
          images={images}
          selectedImageIndex={0}
          onClose={closeLightbox}
          onPrev={() => {}}
          onNext={() => {}}
        />
      )}
    </div>
  );
};

export default Home;