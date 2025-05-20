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
    </div>
  );
};

export default Home;