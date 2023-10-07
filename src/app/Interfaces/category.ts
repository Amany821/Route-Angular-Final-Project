import { SubCategory } from "./sub-category";

export interface Category {
    _id: string;
    category: string;
    image: string;
    name: string;
    subCategories?: SubCategory[];
}
