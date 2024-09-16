import { useState } from 'react';
import { useRouter } from 'next/router';
import photoshootsData from '../../../public/photoshoots.json';
import Image from 'next/image';
import PageTitle from '../../components/pageTitle';
import Header from '../../components/header';
import Lightbox from '../../components/lightbox'; 

const PhotoshootPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const photoshoot = photoshootsData.find((photo) => photo.id === id);

  if (!photoshoot) {
    return <div>Photoshoot not found</div>;
  }

  const { images } = photoshoot;

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

  return (
    <div>
      <PageTitle />
      <Header />
      <div className="flex flex-col items-center mt-6 mb-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-1">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative p-2 cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image}
                  alt={photoshoot.title}
                  layout="responsive"
                  width={1200}
                  height={1600}
                  quality={50}
                  objectFit="cover"
                  className="hover:opacity-75 transition ease-in-out duration-300"
                />
              </div>
            ))}
          </div>
        </div>
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

export default PhotoshootPage;