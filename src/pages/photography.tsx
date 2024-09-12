import PageTitle from '../components/pageTitle';
import Header from '../components/header';
import Image from 'next/image';
import Link from 'next/link';
import photoshootsData from '../../public/photoshoots.json';

const Photography = () => {
  return (
    <div>
      <PageTitle />
      <Header />
      <div className="flex flex-col items-center mt-8 mb-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
            {photoshootsData.map((photoshoot) => (
              <div key={photoshoot.id} className="relative p-2">
                <Link href={`/photography/${photoshoot.id}`}>
                  <div className="flex flex-col cursor-pointer">
                    <div className="aspect-w-4 aspect-h-3">
                      <div className="relative">
                        <Image
                          src={photoshoot.heroImage}
                          alt={photoshoot.title}
                          width={400}
                          height={100}
                          className="hover:opacity-80 duration-200"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-white text-l font-semibold">{photoshoot.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photography;

// import PageTitle from '../components/pageTitle';
// import Header from '../components/header';
// import Image from 'next/image';
// import Link from 'next/link';
// import photoshootsData from '../../public/photoshoots.json';

// const Photography = () => {
//   return (
//     <div>
//       <PageTitle />
//       <Header />
//       <div className="flex flex-col items-center mt-8 mb-2">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-20">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
//             {photoshootsData.map((photoshoot) => (
//               <div key={photoshoot.id} className="relative p-2">
//                 <Link href={`/photography/${photoshoot.id}`}>
//                   <div className="flex flex-col cursor-pointer">
//                     <div className="relative" style={{ paddingTop: '99%' }}>
//                       <Image
//                         src={photoshoot.heroImage}
//                         alt={photoshoot.title}
//                         layout="fill"
//                         objectFit="cover"
//                         className="hover:opacity-80 duration-200"
//                       />
//                       <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                         <p className="text-white text-l font-semibold">
//                           {photoshoot.title}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Photography;




// import PageTitle from '../components/pageTitle';
// import Header from '../components/header';
// import Image from 'next/image';
// import Link from 'next/link';
// import photoshootsData from '../../public/photoshoots.json';

// const Photography = () => {
//   return (
//     <div>
//       <PageTitle />
//       <Header />
//       <div className="flex flex-col items-center mt-6 mb-2">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-20">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
//             {photoshootsData.map((photoshoot) => {
//               const width = 3840; // Set your desired width here
//               const height = (width * 3) / 2; // Calculate the corresponding height

//               return (
//                 <div key={photoshoot.id} className="flex flex-col justify-between p-2">
//                   <Link href={`/photography/${photoshoot.id}`}>
//                     <div className="flex flex-col cursor-pointer p-2">
//                       <div className="aspect-w-2 aspect-h-3">
//                         <div className="relative">
//                           <Image
//                             src={photoshoot.heroImage}
//                             alt={photoshoot.title}
//                             width={width}
//                             height={height}
//                             className="responsive hover:opacity-80 duration-200"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Photography;

