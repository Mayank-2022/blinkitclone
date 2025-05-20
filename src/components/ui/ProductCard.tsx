import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import Button from './Button';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  
  const cartItem = cart.items.find(item => item.product.id === product.id);
  const isInCart = !!cartItem;
  
  const discountedPrice = product.discount 
    ? Math.round(product.price * (1 - product.discount / 100)) 
    : product.price;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="h-40 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
      </Link>
      
      <div className="p-4">
        <h3 className="text-gray-400 text-xs">{product.unit}</h3>
        <Link to={`/product/${product.id}`} className="block">
          <h2 className="font-medium text-gray-800 mb-1 truncate">{product.name}</h2>
        </Link>
        
        <div className="flex items-center mb-3">
          <span className="font-bold">₹{discountedPrice}</span>
          {product.discount && (
            <span className="text-gray-500 text-sm line-through ml-2">₹{product.price}</span>
          )}
        </div>
        
        {isInCart ? (
          <div className="flex items-center justify-between">
            <button 
              onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-gray-600 hover:bg-gray-200"
            >
              <Minus size={16} />
            </button>
            <span className="mx-2 min-w-8 text-center">{cartItem.quantity}</span>
            <button 
              onClick={() => addToCart(product)}
              className="w-8 h-8 flex items-center justify-center bg-green-500 rounded text-white hover:bg-green-600"
            >
              <Plus size={16} />
            </button>
          </div>
        ) : (
          <Button 
            onClick={() => addToCart(product)}
            className="w-full flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            Add
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;