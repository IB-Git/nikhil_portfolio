import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import photoshootsData from '../../public/photoshoots.json';

const Header = () => {
  const router = useRouter();
  const [activePage, setActivePage] = useState('');

  useEffect(() => {
    setActivePage(router.pathname);
  }, [router.pathname]);

  const { id } = router.query;
  const photoshoot = photoshootsData.find((photo) => photo.id === id);
  const photoshootTitle = photoshoot ? photoshoot.title : '';

  return (
    <div className="pt-4 pl-4 mb-2 lg:pt-8 lg:pl-8 lg:absolute left-0 top-0 lg:h-full lg:text-right">
      <header>
        <nav>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="font-bold text-xl">
                Nikhil Nangare
              </Link>
            </li>
            <li>
              {id && <div className="text-gray-800 text-m italic">{photoshootTitle}</div>}
            </li>
            <li className={`${activePage === '/photography' || activePage === '/' || activePage === '' ? 'block' : 'hidden'}`}>
              <Link href="/photography" className="text-gray-1000 hover:text-gray-700">
                Photography
              </Link>
            </li>
            <li className={`${activePage === '/about' || activePage === '/' || activePage === '' ? 'block' : 'hidden'}`}>
              <Link href="/about" className="text-gray-1000 hover:text-gray-700">
                About
              </Link>
            </li>
            <li className={`${activePage === '/contact' || activePage === '/' || activePage === '' ? 'block' : 'hidden'}`}>
              <Link href="/contact" className="text-gray-1000 hover:text-gray-700">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;

// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import photoshootsData from '../../public/photoshoots.json';

// const Header = () => {
//   const router = useRouter();
//   const [activePage, setActivePage] = useState('');

//   useEffect(() => {
//     setActivePage(router.pathname);
//   }, [router.pathname]);

//   const { id } = router.query;
//   const photoshoot = photoshootsData.find((photo) => photo.id === id);
//   const photoshootTitle = photoshoot ? photoshoot.title : '';

//   return (
//     <div className="header-container">
//       <header>
//         <nav>
//           <ul>
//             <li>
//               <Link href="/" className="nav-link">
//                 Nikhil Nangare
//               </Link>
//             </li>
//             <li>
//               {id && <div>{photoshootTitle}</div>}
//             </li>
//             <li className={`nav-item ${activePage === '/photography' ? 'active' : ''}`}>
//               <Link href='/photography' className="nav-link">
//                 Photography
//               </Link>
//             </li>
//             <li className={`nav-item ${activePage === '/about' ? 'active' : ''}`}>
//               <Link href="/about" className="nav-link">
//                 About
//               </Link>
//             </li>
//             <li className={`nav-item ${activePage === '/contact' ? 'active' : ''}`}>
//               <Link href="/contact" className="nav-link">
//                 Contact
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </header>
//       <style jsx>{`
//         .header-container {
//           padding: 16px;
//           background-color: white;
//           z-index: 1000; /* Ensure header is above other content */
//           position: relative; /* Adjust as needed */
//           width: 100%;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Optional: for better visibility */
//         }

//         header ul {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }

//         header li {
//           margin-bottom: 8px;
//         }

//         .nav-item {
//           display: block;
//         }

//         .nav-item.active {
//           font-weight: bold; /* Highlight active page */
//         }

//         .nav-link {
//           text-decoration: none;
//           color: black;
//         }

//         .nav-link:hover {
//           color: gray; /* Change color on hover for better UX */
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Header;

// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import photoshootsData from '../../public/photoshoots.json';

// const Header = () => {
//   const router = useRouter();
//   const [activePage, setActivePage] = useState('');

//   useEffect(() => {
//     setActivePage(router.pathname);
//   }, [router.pathname]);

//   const { id } = router.query;
//   const photoshoot = photoshootsData.find((photo) => photo.id === id);
//   const photoshootTitle = photoshoot ? photoshoot.title : '';

//   return (
//     <div className="pt-4 pl-4 mb-2 lg:pt-8 lg:pl-8 lg:absolute left-0 top-0 lg:h-full lg:text-right">
//       <header>
//         <nav>
//           <ul className="space-y-1">
//             <li>
//               <Link className="font-bold text-xl" href="/">Nikhil Nangare</Link>
//             </li>
//             <li>
//             <div>
//               {id && (
//                   <div className="text-gray-800 text-m italic">{photoshootTitle}</div>
//               )}
//             </div>
//             </li>
//             <li className={`${activePage === '/photography' || activePage === '/' ? 'block' : 'hidden'}`}>
//               <Link href='/photography' className="text-gray-1000 hover:text-gray-700">Photography</Link>
//             </li>
//             <li className={`${activePage === '/about' || activePage === '/' ? 'block' : 'hidden'}`}>
//               <Link href="/about" className="text-gray-1000 hover:text-gray-700">About</Link>
//             </li>
//             <li className={`${activePage === '/contact' || activePage === '/' ? 'block' : 'hidden'}`}>
//               <Link href="/contact" className="text-gray-1000 hover:text-gray-700">Contact</Link>
//             </li>
//           </ul>
//         </nav>
//       </header>
//     </div>
//   );
// };

// export default Header;