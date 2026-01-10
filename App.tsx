
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEOHead, { seoData } from './components/SEOHead';
import Home from './pages/Home';
import About from './pages/About';
import Expertise from './pages/Expertise';
import Projects from './pages/Projects';
import Tribune from './pages/Tribune';
import Legal from './pages/Legal';
import Gallery from './pages/Gallery';

type PageType = 'home' | 'about' | 'expertise' | 'projects' | 'tribune' | 'legal' | 'gallery';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // Handle URL hash navigation or state navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as PageType;
      if (['home', 'about', 'expertise', 'projects', 'tribune', 'legal', 'gallery'].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Get SEO data for current page
  const currentSEO = seoData[currentPage] || seoData.home;

  const renderPage = () => {
    switch (currentPage) {
      case 'about': return <About />;
      case 'expertise': return <Expertise />;
      case 'projects': return <Projects />;
      case 'tribune': return <Tribune />;
      case 'legal': return <Legal />;
      case 'gallery': return <Gallery />;
      default: return <Home onNavigate={(p) => setCurrentPage(p as PageType)} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        url={currentSEO.url}
      />
      <Navbar onNavigate={(p) => setCurrentPage(p as PageType)} currentPage={currentPage} />
      <main id="main-content">
        {renderPage()}
      </main>
      <Footer onNavigate={(p) => setCurrentPage(p as PageType)} />
    </div>
  );
};

export default App;
