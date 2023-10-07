import { CartProduct } from "./cartProduct";

export interface Cart{
    _id:            string;
    cartOwner:      string;
    products:       CartProduct[];
    createdAt:      Date;
    updatedAt:      Date;
    __v:            number;
    totalCartPrice: number;
}