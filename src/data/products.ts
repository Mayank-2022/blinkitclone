import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Fresh Organic Apples',
    description: 'Sweet and crunchy organic apples, perfect for snacking or baking. Sourced from local farms.',
    price: 149,
    image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'fruits-vegetables',
    discount: 10,
    unit: '1 kg',
    inStock: true
  },
  {
    id: 2,
    name: 'Farm Fresh Bananas',
    description: 'Naturally sweet and nutritious bananas, rich in potassium and vitamins.',
    price: 49,
    image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'fruits-vegetables',
    unit: '1 dozen',
    inStock: true
  },
  {
    id: 3,
    name: 'Organic Carrots',
    description: 'Fresh organic carrots, rich in beta-carotene and perfect for salads, cooking, or juicing.',
    price: 59,
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'fruits-vegetables',
    unit: '500 g',
    inStock: true
  },
  {
    id: 4,
    name: 'Full Cream Milk',
    description: 'Farm-fresh full cream milk, pasteurized for safety while retaining its natural goodness.',
    price: 68,
    image: 'https://images.pexels.com/photos/725998/pexels-photo-725998.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'dairy-breakfast',
    unit: '1 L',
    inStock: true
  },
];