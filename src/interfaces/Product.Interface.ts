export default interface ProductDocument {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: [{
    _id: string;
    name: string;
  }];
  category: string;
}