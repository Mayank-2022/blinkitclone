import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ChevronRight, Plus, Minus } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (productId) {
      const foundProduct = products.find(p => p.id === parseInt(productId));
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Find related products from the same category
        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
        
        // Reset quantity
        setQuantity(1);
        
        // Check if product is in cart
        const cartItem = cart.items.find(item => item.product.id === foundProduct.id);
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
      }
    }
  }, [productId, cart.items]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    
    if (product && cart.items.some(item => item.product.id === product.id)) {
      updateQuantity(product.id, newQuantity);
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-48 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  const discountedPrice = product.discount 
    ? Math.round(product.price * (1 - product.discount / 100)) 
    : product.price;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-green-500">Home</Link>
        <ChevronRight size={14} className="mx-2" />
        <Link to={`/category/${product.category}`} className="hover:text-green-500">
          {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </Link>
        <ChevronRight size={14} className="mx-2" />
        <span className="text-gray-700">{product.name}</span>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="max-w-full max-h-80 object-contain transition-transform duration-300 hover:scale-110"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-4">{product.unit}</p>
            
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-gray-800">₹{discountedPrice}</span>
              {product.discount && (
                <>
                  <span className="text-gray-500 text-lg line-through ml-3">₹{product.price}</span>
                  <span className="ml-3 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
            
            <div className="border-t border-gray-100 py-4 mb-4">
              <h2 className="font-medium text-gray-800 mb-2">About the Product</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            {/* Quantity selector */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Quantity</label>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-l-md text-gray-600 hover:bg-gray-200"
                >
                  <Minus size={18} />
                </button>
                <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-200">
                  {quantity}
                </div>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-r-md text-gray-600 hover:bg-gray-200"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
            
            {/* Add to cart button */}
            <div className="flex space-x-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                {cart.items.some(item => item.product.id === product.id)
                  ? 'Update Cart'
                  : 'Add to Cart'
                }
              </Button>
              
              <Button 
                variant="secondary"
                onClick={handleAddToCart}
                className="flex-1"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;