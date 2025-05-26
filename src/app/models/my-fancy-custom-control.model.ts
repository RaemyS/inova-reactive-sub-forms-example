/**
 * Datenmodell für die custom CVA-Component.
 * Ist unabhängig von jeglichen FormCroups etc. und würde auch mit ngModel in einer Template Form funktionieren.
 */
export interface MyFancyCustomControlModel {
  description: string | null;
  category: Category | null;
}

export type Category = 'A' | 'B' | 'C';
