import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  // Determine active states based on pathnames
  const isAboutActive = router.pathname === '/about';
  const isCommercialActive = router.pathname === '/commercial';
  // The root path '/' is the default image grid (Personal).
  const isDefaultActive = router.pathname === '/'; 

  return (
    <div className="px-8 lg:px-12 py-10 lg:py-12">
      <div className="flex items-center space-x-4 lg:space-x-8"> 
        {/* 1. NIKHIL NANGARE (Name) / home */}
        <Link 
          href="/" 
          className={`text-xl lg:text-3xl font-satoshi-regular tracking-tight transition duration-200 ${
            isDefaultActive ? 'font-bold' : 'hover:text-gray-700' 
          }`}
        >
          NIKHIL NANGARE
        </Link>
      
        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4 lg:space-x-8">             
            {/* Commercial Link */}
            <li>
              <Link 
                href="/commercial" 
                className={`text-lg lg:text-2xl font-satoshi-regular transition duration-200 ${
                  isCommercialActive 
                    ? 'font-bold text-black' 
                    : 'hover:text-gray-700'
                }`}
              >
                COMMERCIAL
              </Link>
            </li>
            
            {/* About Link */}
            <li>
              <Link 
                href="/about" 
                className={`text-lg lg:text-2xl font-satoshi-regular transition duration-200 ${
                  isAboutActive 
                    ? 'font-bold text-black' 
                    : 'hover:text-gray-700'
                }`}
              >
                ABOUT
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;