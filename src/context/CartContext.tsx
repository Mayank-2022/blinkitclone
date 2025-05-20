import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '../types';

type CartAction = // Define action types for the cart reducer
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartState { // Define the shape of the cart state
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

interface CartContextProps {  // Define the shape of the context
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const initialState: CartState = { // Define the initial state of the cart
  items: [],
  totalItems: 0,
  totalAmount: 0
};

// Function to calculate total items and total amount in the cart
const calculateCartTotals = (items: CartItem[]): { totalItems: number; totalAmount: number } => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce((total, item) => {
    const price = item.product.discount
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price;
    return total + price * item.quantity;
  }, 0);

  return { totalItems, totalAmount };
};

// Cart reducer function to handle different actions

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id
      );

      let updatedItems: CartItem[];

      if (existingItemIndex !== -1) {
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { product: action.payload, quantity: 1 }];
      }

      const { totalItems, totalAmount } = calculateCartTotals(updatedItems);
      return { items: updatedItems, totalItems, totalAmount };
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(
        (item) => item.product.id !== action.payload
      );
      const { totalItems, totalAmount } = calculateCartTotals(updatedItems);
      return { items: updatedItems, totalItems, totalAmount };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        const updatedItems = state.items.filter(
          (item) => item.product.id !== id
        );
        const { totalItems, totalAmount } = calculateCartTotals(updatedItems);
        return { items: updatedItems, totalItems, totalAmount };
      }
      
      const updatedItems = state.items.map((item) =>
        item.product.id === id ? { ...item, quantity } : item
      );
      
      const { totalItems, totalAmount } = calculateCartTotals(updatedItems);
      return { items: updatedItems, totalItems, totalAmount };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  // Load cart from localStorage on initial render
  const storedCart = localStorage.getItem('cart');
  const initialCart = storedCart ? JSON.parse(storedCart) : initialState;
  
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Save cart to localStorage whenever it changes
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};