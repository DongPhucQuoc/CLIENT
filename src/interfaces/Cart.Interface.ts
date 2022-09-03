import ProductDocument from './Product.Interface';
export default interface CartDocument {
  product: ProductDocument;
  quantity: number;
  total: number;
  size: string;
  isSelected: boolean;
}