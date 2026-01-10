import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = "Charmant, Nyungu, CNK, consultant, transformation digitale, innovation, panafricanisme, data science, cybersécurité, Afrique, RDC, Congo, Kinshasa, Dakar",
  image = "/og-image.svg",
  url = "https://charmantnyungu.com",
  type = "website"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (meta) {
        meta.content = content;
      } else {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    // Primary meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image.startsWith('http') ? image : `https://charmantnyungu.com${image}`, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    
    // Twitter
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image.startsWith('http') ? image : `https://charmantnyungu.com${image}`);
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      canonical.href = url;
    }

  }, [title, description, keywords, image, url, type]);

  return null;
};

export default SEOHead;

// SEO Data for each page
export const seoData = {
  home: {
    title: "Charmant Nyungu K. | Consultant Expert en Transformation Digitale & Innovation Technologique | Panafricaniste",
    description: "Charmant Nyungu K. - Consultant indépendant expert en transformation digitale, data science, cybersécurité et innovation technologique. Visionnaire panafricaniste œuvrant pour une Afrique souveraine et technologiquement indépendante. Basé à Kinshasa et Dakar.",
    keywords: "Charmant, Nyungu, CNK, Charmant Nyungu K, consultant, transformation digitale, innovation technologique, panafricanisme, panafricaniste, data science, cybersécurité, intelligence artificielle, IA, Afrique, RDC, Congo, Kinshasa, Dakar, Sénégal, développement web, stratégie digitale, leadership africain, tech africaine, consultant africain, expert digital",
    url: "https://charmantnyungu.com/"
  },
  about: {
    title: "À Propos de Charmant Nyungu K. | Parcours & Vision | Consultant Innovation Afrique",
    description: "Découvrez le parcours de Charmant Nyungu K., consultant en innovation technologique et transformation digitale. Visionnaire panafricaniste engagé pour le développement technologique de l'Afrique. Expertise en data science, cybersécurité et leadership.",
    keywords: "Charmant Nyungu biographie, parcours Charmant, consultant africain, visionnaire panafricaniste, expert transformation digitale Afrique, leadership technologique, innovation Afrique, Nyungu parcours, CNK biographie",
    url: "https://charmantnyungu.com/#about"
  },
  expertise: {
    title: "Expertise & Compétences | Charmant Nyungu K. | Data Science, Cybersécurité, Innovation",
    description: "Les domaines d'expertise de Charmant Nyungu K. : Data Science & Intelligence Artificielle, Cybersécurité, Développement Web, Transformation Digitale, Communication Stratégique et Mentorat. Solutions sur mesure pour l'Afrique.",
    keywords: "expertise Charmant Nyungu, data science Afrique, cybersécurité RDC, développement web Congo, transformation digitale consultant, intelligence artificielle Afrique, compétences Nyungu, services consulting, expert IA Kinshasa",
    url: "https://charmantnyungu.com/#expertise"
  },
  projects: {
    title: "Projets & Réalisations | Charmant Nyungu K. | Portfolio Innovation Technologique",
    description: "Portfolio des projets réalisés par Charmant Nyungu K. : plateformes digitales, solutions d'intelligence artificielle, systèmes de cybersécurité et initiatives panafricaines. Découvrez les réalisations concrètes.",
    keywords: "projets Charmant Nyungu, portfolio consultant, réalisations innovation, plateformes digitales Afrique, projets technologiques RDC, solutions IA, initiatives panafricaines, YBS Innovate",
    url: "https://charmantnyungu.com/#projects"
  },
  tribune: {
    title: "Tribune & Réflexions | Charmant Nyungu K. | Panafricanisme, Technologie, Leadership",
    description: "Les réflexions et analyses de Charmant Nyungu K. sur le panafricanisme, la souveraineté technologique africaine, le leadership et la gouvernance numérique. Articles et tribunes sur l'avenir de l'Afrique.",
    keywords: "tribune Charmant Nyungu, panafricanisme articles, souveraineté technologique Afrique, leadership africain, gouvernance numérique, réflexions Nyungu, blog consultant, analyses politiques Afrique",
    url: "https://charmantnyungu.com/#tribune"
  },
  gallery: {
    title: "Galerie Photos | Charmant Nyungu K. | Moments & Événements",
    description: "Galerie photos de Charmant Nyungu K. : conférences, événements, rencontres professionnelles et moments clés du parcours d'un consultant engagé pour l'innovation africaine.",
    keywords: "photos Charmant Nyungu, galerie consultant, événements innovation, conférences Afrique, Nyungu images, CNK photos, moments professionnels",
    url: "https://charmantnyungu.com/#gallery"
  },
  legal: {
    title: "Mentions Légales & Politique de Confidentialité | Charmant Nyungu K.",
    description: "Mentions légales et politique de confidentialité du site de Charmant Nyungu K. Informations sur l'éditeur, la protection des données et les conditions d'utilisation.",
    keywords: "mentions légales Charmant Nyungu, politique confidentialité, RGPD, protection données, conditions utilisation",
    url: "https://charmantnyungu.com/#legal"
  }
};

