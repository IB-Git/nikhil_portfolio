import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/header';
import PageTitle from '../components/pageTitle';
import Image from 'next/image';
import photoshootsData from '../../public/photoshoots.json';

const Home = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Check if the current route is the root URL
    if (router.pathname === '/') {
      const defaultCollectionId = photoshootsData[0]?.id; // Get the ID of the default collection
      if (defaultCollectionId) {
        router.replace(`/photography/${defaultCollectionId}`); // Redirect to the default collection page
      }
    }
  }, [router]);

  // Handle the case where redirection happens but component renders
  if (router.pathname !== '/') {
    const selectedCollection = photoshootsData.find(
      (photoshoot) => photoshoot.id === router.query.id
    ) || photoshootsData[0]; // Default to the first collection if not found

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
  }

  return <p>Redirecting...</p>; // Display a message during the redirect
};

export default Home;
