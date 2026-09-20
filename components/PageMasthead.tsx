import React from 'react';
interface PageMastheadProps { number: string; title: string; signature: string; description?: string; image?: string; }
const PageMasthead: React.FC<PageMastheadProps> = ({ number, title, signature, description, image }) => (
  <header className={`page-masthead ${image ? 'page-masthead-with-image' : ''}`}>
    <div className="page-masthead-inner">
      <div className="page-breadcrumb"><a href="/">Accueil</a><span aria-hidden="true">/</span><span>{title}</span><span className="page-index">{number} — Charmant Nyungu K.</span></div>
      <div className="page-masthead-grid"><div><p className="page-handwritten">{signature}</p><h1>{title}<span className="page-title-dot">.</span></h1>{description && <p className="page-description">{description}</p>}<a href="#page-content" className="page-explore">Explorer cette page <span aria-hidden="true">↓</span></a></div>
      {image && <figure><img src={image} alt="Charmant Nyungu K." fetchPriority="high"/><figcaption>Une vision africaine. Une portée mondiale.</figcaption></figure>}</div>
    </div>
  </header>
);
export default PageMasthead;
