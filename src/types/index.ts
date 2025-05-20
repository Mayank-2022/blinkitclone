export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  discount?: number;
  unit: string;
  inStock: boolean;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}