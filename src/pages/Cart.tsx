import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  
  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="text-gray-400 mb-6">
            <ShoppingCart size={64} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/">
            <Button className="flex items-center justify-center gap-2 px-6">
              <ArrowLeft size={18} />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>
      
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Cart Items ({cart.totalItems})</h2>
              
              <div className="divide-y divide-gray-100">
                {cart.items.map((item) => {
                  const { product, quantity } = item;
                  const discountedPrice = product.discount 
                    ? Math.round(product.price * (1 - product.discount / 100)) 
                    : product.price;
                  
                  return (
                    <div key={product.id} className="py-4 flex items-center">
                      {/* Product Image */}
                      <Link to={`/product/${product.id}`} className="flex-shrink-0">
                        <div className="w-16 h-16 rounded overflow-hidden bg-gray-50">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      
                      {/* Product Info */}
                      <div className="ml-4 flex-1">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-medium text-gray-800 hover:text-green-500 transition">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-gray-500 text-sm">{product.unit}</p>
                        
                        <div className="flex flex-wrap items-center justify-between mt-2">
                          <div className="flex items-center">
                            <span className="font-semibold">₹{discountedPrice}</span>
                            {product.discount && (
                              <span className="text-gray-500 text-sm line-through ml-2">
                                ₹{product.price}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center mt-2 sm:mt-0">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-l text-gray-600 hover:bg-gray-200"
                            >
                              <Minus size={16} />
                            </button>
                            <div className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-100">
                              {quantity}
                            </div>
                            <button
                              onClick={() => addToCart(product)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-r text-gray-600 hover:bg-gray-200"
                            >
                              <Plus size={16} />
                            </button>
                            
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="ml-4 text-gray-400 hover:text-red-500"
                              aria-label="Remove item"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Continue Shopping */}
          <div className="mb-6 lg:mb-0">
            <Link to="/" className="text-green-500 hover:text-green-600 flex items-center">
              <ArrowLeft size={16} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-20">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{cart.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">₹40.00</span>
                </div>
                {cart.totalAmount >= 500 && (
                  <div className="flex justify-between text-green-500">
                    <span>Delivery Fee Waiver</span>
                    <span>-₹40.00</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{(cart.totalAmount + (cart.totalAmount >= 500 ? 0 : 40)).toFixed(2)}</span>
                </div>
              </div>
              
              {cart.totalAmount < 500 && (
                <div className="bg-yellow-50 border border-yellow-100 rounded p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    Add items worth ₹{(500 - cart.totalAmount).toFixed(2)} more to get free delivery!
                  </p>
                </div>
              )}
              
              <Button 
                variant="primary"
                className="w-full flex items-center justify-center text-center"
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-4 text-xs text-gray-500 text-center">
                <p>Free cancellation until the order is prepared</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;