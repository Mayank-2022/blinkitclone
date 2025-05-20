import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/ui/Banner';
import CategoryTile from '../components/ui/CategoryTile';
import ProductCard from '../components/ui/ProductCard';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { banners } from '../data/banners';

const Home: React.FC = () => {
  // Get random products for featured section
  const featuredProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);
  
  // Products with discounts for offers section
  const discountedProducts = products
    .filter(product => product.discount)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4">
      {/* Banner Carousel */}
      <div className="mt-6 mb-8">
        <Banner banners={banners} />
      </div>

      {/* Categories */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Shop by Category</h2>
          <Link to="/categories" className="text-green-500 hover:text-green-600 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <CategoryTile key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Featured Products</h2>
          <Link to="/products" className="text-green-500 hover:text-green-600 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Top Offers */}
      <section className="mb-10">
        <div className="bg-yellow-50 p-4 md:p-6 rounded-lg border border-yellow-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Top Offers</h2>
            <Link to="/offers" className="text-green-500 hover:text-green-600 text-sm font-medium">
              View All Offers
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {discountedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">Delivery in 10 minutes, right at your doorstep</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">100% Fresh</h3>
            <p className="text-gray-600 text-sm">Fresh produce guaranteed or we'll refund</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 15.879A10 10 0 1120 8c-5.343 0-5.343 7.657-10 7.657-4.657 0-4.657-7.657-10-7.657 0 5.5 4.472 10 9.98 9.98.168 0 .334-.01.498-.03l.005.008z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Wide Selection</h3>
            <p className="text-gray-600 text-sm">Over 5000+ products to choose from</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Easy Payments</h3>
            <p className="text-gray-600 text-sm">Multiple payment options for your convenience</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;