import { Product } from "./product";

export interface CartProduct {
    count:   number;
    _id:     string;
    product: Product;
    price:   number;
}