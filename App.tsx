
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
import Manifeste from './pages/Manifeste';
import { getPageFromLocation, navigateToPage, PageType, syncLegacyHashRoute } from './utils/navigation';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  useEffect(() => {
    const syncRoute = () => {
      syncLegacyHashRoute();
      setCurrentPage(getPageFromLocation());
    };

    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    syncRoute();

    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  const currentSEO = seoData[currentPage] || seoData.home;

  const renderPage = () => {
    switch (currentPage) {
      case 'about': return <About />;
      case 'expertise': return <Expertise />;
      case 'projects': return <Projects />;
      case 'tribune': return <Tribune />;
      case 'manifeste': return <Manifeste />;
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
        image={currentSEO.image}
      />
      <Navbar
        onNavigate={(p) => {
          const nextPage = p as PageType;
          navigateToPage(nextPage);
          setCurrentPage(nextPage);
        }}
        currentPage={currentPage}
      />
      <main id="main-content">
        {renderPage()}
      </main>
      <Footer
        onNavigate={(p) => {
          const nextPage = p as PageType;
          navigateToPage(nextPage);
          setCurrentPage(nextPage);
        }}
      />
    </div>
  );
};

export default App;
