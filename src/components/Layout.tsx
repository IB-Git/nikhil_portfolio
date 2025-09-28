import React from 'react';
import Header from './header'; 
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-black">

      {/* Page Title & SEO (Integrated from PageTitle.tsx) */}
      <Head>
        <title>Nikhil Nangare Photography</title>      
        <link rel="canonical" href="https://www.nikhilnangare.art" /> 
      </Head>

      {/* Header/Navigation Area */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white">
        <Header />
      </div>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-8 lg:px-12 pt-40 lg:pt-48"> 
        {children}
      </main>
    </div>
  );
};

export default Layout;