import { PageMeta } from './page-meta';

export interface PageConfig {
  template: string;
  slug?: string;
  meta?: PageMeta;
  title?: string;
  [key: string]: any;
}
