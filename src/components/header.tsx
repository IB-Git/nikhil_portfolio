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
              <Link className="font-bold text-xl" href="/">Nikhil Nangare</Link>
            </li>
            <li>
            <div>
              {id && (
                  <div className="text-gray-800 text-m italic">{photoshootTitle}</div>
              )}
            </div>
            </li>
            <li className={`${activePage === '/photography' || activePage === '/' ? 'block' : 'hidden'}`}>
              <Link href='/photography' className="text-gray-1000 hover:text-gray-700">Photography</Link>
            </li>
            <li className={`${activePage === '/about' || activePage === '/' ? 'block' : 'hidden'}`}>
              <Link href="/about" className="text-gray-1000 hover:text-gray-700">About</Link>
            </li>
            <li className={`${activePage === '/contact' || activePage === '/' ? 'block' : 'hidden'}`}>
              <Link href="/contact" className="text-gray-1000 hover:text-gray-700">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;




