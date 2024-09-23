import { Subcategory } from './subcategory';

export interface Category {
  id?: string;
  name: string;
  weight: number;
  subcategories: Subcategory[];
}
