export type SiteSearchSection = 'Pages' | 'Dictionnaire' | 'Grammaire' | 'Nuances' | 'Culture';

export interface SiteSearchItem {
  id: string;
  title: string;
  href: string;
  section: SiteSearchSection;
  summary: string;
  keywords: string[];
  weight?: number;
}

