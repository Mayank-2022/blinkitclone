import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { Product } from '../types';
import { Filter, SlidersHorizontal } from 'lucide-react';

const ProductListing: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  
  const category = categories.find(cat => cat.slug === categorySlug);

  useEffect(() => {
    let filtered: Product[];
    
    if (query) {
      // Handle search query
      const searchQuery = query.toLowerCase();
      filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery) || 
        product.description.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery)
      );
    } else if (categorySlug) {
      // Handle category filtering
      filtered = products.filter(product => product.category === categorySlug);
    } else {
      // Show all products if no category or query
      filtered = [...products];
    }
    
    // Sort products
    sortProducts(filtered, sortOption);
  }, [categorySlug, query, sortOption]);

  const sortProducts = (productsToSort: Product[], option: string) => {
    let sorted: Product[];
    
    switch(option) {
      case 'price-low-to-high':
        sorted = [...productsToSort].sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high-to-low':
        sorted = [...productsToSort].sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceB - priceA;
        });
        break;
      case 'discount':
        sorted = [...productsToSort].sort((a, b) => {
          const discountA = a.discount || 0;
          const discountB = b.discount || 0;
          return discountB - discountA;
        });
        break;
      case 'recommended':
      default:
        // Keep original order for recommended
        sorted = [...productsToSort];
        break;
    }
    
    setFilteredProducts(sorted);
  };

  const title = query 
    ? `Search Results for "${query}"` 
    : category 
      ? category.name 
      : 'All Products';

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-500 mt-1">{filteredProducts.length} products found</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="mr-4 flex items-center text-gray-700 hover:text-green-500 md:hidden"
          >
            <Filter size={18} className="mr-1" />
            Filters
          </button>
          
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-700"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
              <option value="discount">Discount</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <SlidersHorizontal size={16} className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters - Desktop (sidebar) */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="hidden md:block w-64 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Filters</h3>
          
          {/* Categories Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
            <div className="space-y-2">
              {categories.map(cat => (
                <div key={cat.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${cat.id}`}
                    className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                    checked={categorySlug === cat.slug}
                    readOnly
                  />
                  <label htmlFor={`category-${cat.id}`} className="ml-2 text-sm text-gray-700">
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Price Range Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="price-1"
                  className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="price-1" className="ml-2 text-sm text-gray-700">
                  Under ₹100
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="price-2"
                  className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="price-2" className="ml-2 text-sm text-gray-700">
                  ₹100 - ₹200
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="price-3"
                  className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="price-3" className="ml-2 text-sm text-gray-700">
                  ₹200 - ₹500
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="price-4"
                  className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="price-4" className="ml-2 text-sm text-gray-700">
                  Above ₹500
                </label>
              </div>
            </div>
          </div>
          
          {/* Discount Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Discount</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="discount-1"
                  className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="discount-1" className="ml-2 text-sm text-gray-700">
                  10% or more
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="discount-2"
                  className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="discount-2" className="ml-2 text-sm text-gray-700">
                  25% or more
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Filters */}
        {showFilters && (
          <div className="md:hidden bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Filters</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="text-gray-500"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Categories Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
              <div className="space-y-2">
                {categories.map(cat => (
                  <div key={cat.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`mobile-category-${cat.id}`}
                      className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                      checked={categorySlug === cat.slug}
                      readOnly
                    />
                    <label htmlFor={`mobile-category-${cat.id}`} className="ml-2 text-sm text-gray-700">
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="mobile-price-1"
                    className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="mobile-price-1" className="ml-2 text-sm text-gray-700">
                    Under ₹100
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="mobile-price-2"
                    className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="mobile-price-2" className="ml-2 text-sm text-gray-700">
                    ₹100 - ₹200
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-1">No products found</h3>
              <p className="text-gray-500">Try changing your filters or search for something else</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;