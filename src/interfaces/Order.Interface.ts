import CartDocument from "./Cart.Interface";

export default interface OrderDocument {
  comment: string;
  infoGuest: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
  };
  orderDetails: CartDocument[]
}