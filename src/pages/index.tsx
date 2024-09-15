import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/header';
import PageTitle from '../components/pageTitle';
import Image from 'next/image';
import photoshootsData from '../../public/photoshoots.json';

interface Photoshoot {
  id: string;
  title: string;
  images: string[];
}

const Home = () => {
  const router = useRouter();
  const [selectedCollection, setSelectedCollection] = useState<Photoshoot | null>(null); // State for collection

  useEffect(() => {
    const handleRedirect = async () => {
      // Check if the current route is the root URL
      if (router.pathname === '/') {
        const defaultCollectionId = photoshootsData[0]?.id; // Get the ID of the default collection
        if (defaultCollectionId) {
          await router.replace(`/photography/${defaultCollectionId}`); // Redirect to the default collection page
        }
      } else {
        // Set the selected collection based on the URL
        const collection = photoshootsData.find(
          (photoshoot: Photoshoot) => photoshoot.id === router.query.id
        ) || photoshootsData[0]; // Default to the first collection if not found
        setSelectedCollection(collection);
      }
    };

    handleRedirect();
  }, [router]);

  if (!selectedCollection) {
    return <p>Loading...</p>; // Show loading while redirecting or fetching collection
  }

  return (
    <div className="content__width max-h-full h-full overflow-auto">
      <PageTitle />
      <Header />
      <div className="grid grid-cols-2 gap-4 mt-8">
        {selectedCollection.images.map((image: string, index: number) => (
          <div key={index} className="relative w-full h-auto">
            <Image
              src={image}
              alt={`Image ${index}`}
              width={600}
              height={600}
              objectFit="cover"
              className="w-full h-full"
              loading="lazy" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;