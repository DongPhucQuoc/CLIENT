export interface PaypalDocument {
  product: string;
  quantity: number;
  size: string;
}

export interface PaypalGuestInfo {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
} 