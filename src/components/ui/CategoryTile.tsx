import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';

interface CategoryTileProps {
  category: Category;
}

const CategoryTile: React.FC<CategoryTileProps> = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.slug}`} 
      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-2">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <h3 className="text-sm font-medium text-gray-800 text-center mt-2">{category.name}</h3>
    </Link>
  );
};

export default CategoryTile;