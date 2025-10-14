import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Header = () => {
  const router = useRouter();

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('theme')) {
        return localStorage.getItem('theme') as 'light' | 'dark';
      }
      // Check system preference if no local storage value exists
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    // Set smooth transition for color changes
    root.style.transition = 'background-color 0.5s, color 0.5s'; 
    
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const isAboutActive = router.pathname === '/about';
  const isFilmActive = router.pathname === '/film';
  const isDefaultActive = router.pathname === '/'; 
  
  return (
    <div className="px-8 lg:px-12 py-10 lg:py-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-5 lg:space-x-8"> 
          {/* 1. NIKHIL NANGARE (Name) - Standardized Size */}
          <Link 
            href="/" 
            className={`text-base lg:text-2xl font-satoshi-regular tracking-tight transition duration-200 ${
              isDefaultActive 
                ? 'font-bold text-black dark:text-gray-100' 
                : 'hover:text-gray-700 dark:hover:text-gray-400' 
            }`}
          >
            NIKHIL NANGARE
          </Link>
        
          {/* Navigation Links */}
          <nav>
            <ul className="flex space-x-4 lg:space-x-8">             
              {/* Film Link */}
              <li>
                <Link 
                  href="/film" 
                  className={`text-base lg:text-2xl font-satoshi-regular transition duration-200 ${
                    isFilmActive 
                      ? 'font-bold text-black dark:text-gray-100' 
                      : 'hover:text-gray-700 dark:hover:text-gray-400'
                  }`}
                >
                  FILM
                </Link>
              </li>
              
              {/* About Link */}
              <li>
                <Link 
                  href="/about" 
                  className={`text-base lg:text-2xl font-satoshi-regular transition duration-200 ${
                    isAboutActive 
                      ? 'font-bold text-black dark:text-gray-100' 
                      : 'hover:text-gray-700 dark:hover:text-gray-400'
                  }`}
                >
                  ABOUT
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* 4. THE TOGGLE BUTTON */}
        <button
          onClick={toggleTheme}
          className="text-base lg:text-xl font-satoshi-regular hover:text-gray-700 dark:hover:text-gray-400 transition duration-200"
          aria-label="Toggle theme"
        >
          {/* Soft White on Dark, Black on Light */}
          {theme === 'light' ? '⚫' : '⚪'} 
        </button>
      </div>
    </div>
  );
};

export default Header;
