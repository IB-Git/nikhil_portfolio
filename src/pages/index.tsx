import Header from '../components/header';
import PageTitle from '../components/pageTitle';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import photoshootsData from '../../public/photoshoots.json';

const Home = () => {
  const [selectedCollection, setSelectedCollection] = useState(photoshootsData[0]); // Default to the first collection

  return (
    <div className="content__width max-h-full h-full overflow-auto">
      <PageTitle />
      <Header />
      <div className="grid grid-cols-2 gap-4 mt-8">
        {selectedCollection.images.map((image, index) => (
          <div key={index} className="relative w-full h-auto">
            <Image
              src={image}
              alt={`Image ${index}`}
              width={600} 
              height={600} 
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
