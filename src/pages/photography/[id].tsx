import { useRouter } from 'next/router';
import photoshootsData from '../../../public/photoshoots.json';
import Image from 'next/image';
import PageTitle from '../../components/pageTitle';
import Header from '../../components/header';
import styled from 'styled-components';


const Container = styled.div`
  max-width: 900px; /* Adjust the value to your desired width */
  margin-left: auto;
  margin-right: auto;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const PhotoshootPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const photoshoot = photoshootsData.find((photo) => photo.id === id);

  if (!photoshoot) {
    return <div>Photoshoot not found</div>;
  }

  const { heroImage, images } = photoshoot;

  return (
    <div>
      <PageTitle />
      <Header />
      <div className="flex flex-col items-center mt-8 mb-2">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-center">
            <Container>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                  <div key={image} className="flex flex-col justify-between p-1">
                    <Image
                      src={image}
                      alt={photoshoot.title}
                      width={1200}
                      height={1600}
                      className="hover:opacity-75 transition ease-in-out duration-300"
                    />
                  </div>
                ))}
              </div>
            </Container>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoshootPage;



// import { useRouter } from 'next/router';
// import photoshootsData from '../../../public/photoshoots.json';
// import Image from 'next/image';
// import PageTitle from '../../components/pageTitle';
// import Header from '../../components/header';

// const PhotoshootPage = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const photoshoot = photoshootsData.find((photo) => photo.id === id);

//   if (!photoshoot) {
//     return <div>Photoshoot not found</div>;
//   }

//   const { heroImage, images } = photoshoot;

//   return (
//     <div>
//       <PageTitle />
//       <Header />
//       <div className="flex flex-col items-center mt-6 mb-2">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-20">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
//           {images.map((image) => (
//             <div key={image} className="flex flex-col justify-between p-4">
//               <Image
//                 src={image}
//                 alt={photoshoot.title}
//                 width={1200}
//                 height={1600}
//                 className="hover:opacity-75 transition ease-in-out duration-300"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//     </div>
    
//   );
// };

// export default PhotoshootPage;

// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import photoshootsData from '../../../public/photoshoots.json';
// import Image from 'next/image';
// import PageTitle from '../../components/pageTitle';
// import Header from '../../components/header';
// import ModalImage from 'react-modal-image';

// const PhotoshootPage = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const photoshoot = photoshootsData.find((photo) => photo.id === id);

//   if (!photoshoot) {
//     return <div>Photoshoot not found</div>;
//   }

//   const { heroImage, images } = photoshoot;

//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   const handleModalClose = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <div>
//       <PageTitle />
//       <Header />
//       <div className="flex flex-col items-center mt-6 mb-2">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-20">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
//             {images.map((image) => (
//               <div
//                 key={image}
//                 className="flex flex-col justify-between p-4 cursor-pointer"
//                 onClick={() => handleImageClick(image)}
//               >
//                 <Image
//                   src={image}
//                   alt={photoshoot.title}
//                   width={1200}
//                   height={1600}
//                   className="hover:opacity-75 transition ease-in-out duration-300"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       {selectedImage && (
//         <ModalImage
//           small={selectedImage}
//           large={selectedImage}
//           alt="Modal Image"
//           onClose={handleModalClose}
//         />
//       )}
//     </div>
//   );
// };

// export default PhotoshootPage;



