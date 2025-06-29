
export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageURL: string;
  category: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
