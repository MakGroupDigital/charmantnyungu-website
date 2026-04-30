export type PageType =
  | 'home'
  | 'about'
  | 'expertise'
  | 'projects'
  | 'manifeste'
  | 'tribune'
  | 'legal'
  | 'gallery';

const pagePaths: Record<PageType, string> = {
  home: '/',
  about: '/a-propos',
  expertise: '/expertise',
  projects: '/projets',
  manifeste: '/manifeste/etre-artificiel-autonome-ia-2070',
  tribune: '/tribune',
  legal: '/mentions-legales',
  gallery: '/galerie',
};

const aliases = new Map<string, PageType>([
  ['/', 'home'],
  ['/accueil', 'home'],
  ['/a-propos', 'about'],
  ['/expertise', 'expertise'],
  ['/projets', 'projects'],
  ['/manifeste', 'manifeste'],
  ['/manifeste/etre-artificiel-autonome-ia-2070', 'manifeste'],
  ['/tribune', 'tribune'],
  ['/mentions-legales', 'legal'],
  ['/galerie', 'gallery'],
]);

export const getPathForPage = (page: PageType) => pagePaths[page];

export const getPageFromLocation = (): PageType => {
  const hash = window.location.hash.replace('#', '');

  if (hash) {
    const hashMap = new Map<string, PageType>([
      ['home', 'home'],
      ['about', 'about'],
      ['expertise', 'expertise'],
      ['projects', 'projects'],
      ['manifeste', 'manifeste'],
      ['tribune', 'tribune'],
      ['legal', 'legal'],
      ['gallery', 'gallery'],
    ]);

    const pageFromHash = hashMap.get(hash);
    if (pageFromHash) {
      return pageFromHash;
    }
  }

  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  return aliases.get(pathname) || 'home';
};

export const syncLegacyHashRoute = () => {
  const hash = window.location.hash.replace('#', '');

  if (!hash) {
    return;
  }

  const page = getPageFromLocation();
  const nextPath = getPathForPage(page);
  window.history.replaceState({}, '', nextPath);
};

export const navigateToPage = (page: PageType) => {
  const nextPath = getPathForPage(page);

  if (window.location.pathname !== nextPath) {
    window.history.pushState({}, '', nextPath);
  }
};
