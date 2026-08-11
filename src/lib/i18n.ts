export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];
export type Localized<T> = Record<Locale, T>;

export type DataLoadError = {
  kind: "missing" | "invalid";
};

export type UiDictionary = {
  metadata: {
    title: string;
    description: string;
  };
  common: {
    close: string;
    clearFilters: string;
  };
  nav: {
    mainAria: string;
    section: string;
    directory: string;
    switchLanguage: string;
    switchLanguageLabel: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    projects: string;
    languages: string;
    stars: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    searchPlaceholder: string;
    searchLabel: string;
    allLanguages: string;
    sortUpdated: string;
    sortStars: string;
    sortName: string;
    primaryLanguage: string;
    license: string;
    stars: string;
    createdAt: string;
    updatedAt: string;
    accountType: string;
    introduction: string;
    agentLoop: string;
    classificationBasis: string;
    primaryCapabilities: string;
    searchCapabilities: string;
    limitations: string;
    userFeedback: string;
    supportedPlatforms: string;
    relatedProjects: string;
    aliases: string;
    sources: string;
    authorNote: string;
    openGitHub: string;
    missingFile: string;
    invalidFile: string;
    emptyFile: string;
    updatedPrefix: string;
    viewArchive: string;
    openDetails: string;
    cardDetailHint: string;
    githubAriaPrefix: string;
    githubAriaSuffix: string;
    noResults: string;
    adjustFilters: string;
  };
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function intlLocale(locale: Locale) {
  return locale === "zh" ? "zh-CN" : "en-US";
}

export function htmlLanguage(locale: Locale) {
  return locale === "zh" ? "zh-CN" : "en";
}
