export const COURSE_PACKAGE_PRICE_USD = 44;
export const COURSE_PACKAGE_ACCESS_SCOPE = 'cnk-course-package';

export const coursePackage = [
  {
    slug: 'algorithmique-logique-programmation',
    title: 'Algorithmique et logique de programmation',
    shortTitle: 'Algorithmique',
    fileName: 'manuel-algorithmique-logique-programmation-charmant-nyungu.pdf',
    level: 'Fondations solides',
    duration: 'Manuel complet',
    summary:
      "Un parcours pour apprendre a raisonner comme un developpeur : conditions, boucles, tableaux, fonctions, tris, recherches, complexite et methodes de resolution de problemes.",
    why:
      "L'algorithmique reste la base de tout metier logiciel moderne. Elle permet de comprendre un probleme, d'ecrire une solution fiable et de progresser vers le backend, la data, l'IA ou la cybersécurite sans dependance aveugle aux outils.",
    outcomes: [
      'Structurer un probleme en entrees, traitements et sorties.',
      'Comprendre les structures de controle et les structures de donnees.',
      'Evaluer la complexite et ameliorer une solution.',
    ],
  },
  {
    slug: 'python-professionnel',
    title: 'Python professionnel',
    shortTitle: 'Python',
    fileName: 'manuel-python-professionnel-charmant-nyungu.pdf',
    level: 'Pratique professionnelle',
    duration: 'Manuel complet',
    summary:
      "Un manuel pour passer de la syntaxe Python a des usages professionnels : automatisation, scripts propres, fichiers, fonctions, modules, logique de projet et bonnes pratiques.",
    why:
      "Python est devenu une langue centrale pour automatiser, analyser, prototyper et construire des solutions modernes. Le maitriser donne une avance immediate dans la data, l'IA, le scripting, le backend et la productivite technique.",
    outcomes: [
      'Ecrire du code Python lisible et exploitable.',
      'Automatiser des taches concretes avec une logique robuste.',
      'Preparer la transition vers data, IA, API et outils internes.',
    ],
  },
  {
    slug: 'bases-de-donnees',
    title: 'Bases de donnees',
    shortTitle: 'Bases de donnees',
    fileName: 'manuel-bases-de-donnees-charmant-nyungu.pdf',
    level: 'Backend & donnees',
    duration: 'Manuel complet',
    summary:
      "Une formation complete pour concevoir, interroger, optimiser et securiser des bases de donnees avec une logique de systeme reel : SQL, modelisation, index, sauvegardes et exploitation.",
    why:
      "Aucune application serieuse ne tient sans donnees fiables. Comprendre les bases de donnees evite les pertes, les lenteurs, les incoherences et les failles qui detruisent les produits numeriques.",
    outcomes: [
      'Modeliser correctement les entites et les relations.',
      'Ecrire des requetes utiles et maintenables.',
      'Comprendre performance, sauvegarde et securite des donnees.',
    ],
  },
  {
    slug: 'architecture-logicielle',
    title: 'Architecture logicielle',
    shortTitle: 'Architecture',
    fileName: 'manuel-architecture-logicielle-charmant-nyungu.pdf',
    level: 'Systemes maintenables',
    duration: 'Manuel complet',
    summary:
      "Un manuel pour organiser un vrai projet logiciel : modules, services, separation des responsabilites, API, tests, documentation, securite et vision evolutive.",
    why:
      "Un code qui marche aujourd'hui peut devenir impossible a maintenir demain. L'architecture apprend a construire des systemes lisibles, securises, evolutifs et transmissibles a une equipe.",
    outcomes: [
      'Decouper un projet en modules coherents.',
      'Clarifier les responsabilites metier et techniques.',
      'Structurer un systeme pret pour la croissance.',
    ],
  },
  {
    slug: 'cybersecurite-defensive',
    title: 'Cybersecurite defensive',
    shortTitle: 'Cybersecurite',
    fileName: 'manuel-cybersecurite-defensive-charmant-nyungu.pdf',
    level: 'Defense numerique',
    duration: 'Manuel complet',
    summary:
      "Un parcours axe defense : hygiene numerique, menaces, controle d'acces, protection des donnees, surveillance, reaction et reduction des risques operationnels.",
    why:
      "Les entreprises, institutions et projets digitaux africains deviennent des cibles. La securite defensive permet de proteger les utilisateurs, les donnees et la continuite des services.",
    outcomes: [
      'Identifier les risques les plus courants.',
      'Mettre en place une hygiene de securite pragmatique.',
      'Comprendre surveillance, reaction et protection des actifs.',
    ],
  },
  {
    slug: 'data-science-ia-avancee',
    title: 'Data Science et IA avancee',
    shortTitle: 'Data & IA',
    fileName: 'manuel-data-science-ia-avancee-charmant-nyungu.pdf',
    level: 'Analyse & intelligence',
    duration: 'Manuel complet',
    summary:
      "Un manuel pour comprendre les statistiques, la preparation de donnees, la visualisation, le machine learning, le deep learning, le NLP, la vision et les projets data utiles.",
    why:
      "L'IA ne remplace pas la comprehension : elle amplifie ceux qui savent poser les bonnes questions, preparer les donnees, evaluer les resultats et transformer l'analyse en decision.",
    outcomes: [
      "Comprendre le cycle complet d'un projet data.",
      'Relier modeles, evaluation et impact metier.',
      "Construire une base solide pour l'IA appliquee.",
    ],
  },
];

export const getCourseBySlug = (slug) => coursePackage.find((course) => course.slug === slug);
