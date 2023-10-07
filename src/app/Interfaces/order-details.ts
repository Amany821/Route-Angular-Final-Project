import { CartProduct } from "./cartProduct";

export interface OrderDetails {
    cartItems: CartProduct[];
    createdAt: Date;
    id: number;
    isDelivered: boolean;
    isPaid: boolean;
    paidAt: Date;
    paymentMethodType: string;
    totalOrderPrice: number;
}
