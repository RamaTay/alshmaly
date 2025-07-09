import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { Loader2 } from 'lucide-react';

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { products, categories, loading, error } = useProducts({
    category: activeCategory,
    sortBy: 'name'
  });

  // Prepare categories for display
  const displayCategories = [
    { id: 'all', name: 'All Products', slug: 'all' },
    ...categories
  ];

  return (
    <section id="products" className="py-20 bg-[#054239] overflow-hidden w-full">
      <div className="container mx-auto px-4"> 
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#edebe0] mb-4">
            Our Products
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Discover our premium selection of Syrian agricultural products, carefully selected and processed for quality
          </p>
        </div>

   
        {/* Category Filter */}
            {/*  <div className="flex flex-wrap justify-center gap-4 mb-12 overflow-x-auto no-scrollbar">
          <div className="flex space-x-4 min-w-max px-4">
            {displayCategories.map(category => (
              <button
                key={category.slug}
                onClick={() => setActiveCategory(category.slug)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.slug
                    ? 'bg-[#b9a779] text-white shadow-lg'
                    : 'bg-white text-[#054239] hover:bg-[#054239] hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        */}

        {/* Products Grid */}
        <div className="w-full mb-12">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-[#b9a779]" size={48} />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">Error loading products: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 6).map(product => (
              <div key={product.id} className="bg-[#054239] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group w-full">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.images?.[0]?.image_url || 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=300'} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#edebe0] mb-2">{product.name}</h3>
                  <p className="text-white mb-4">{product.description}</p>
                  <Link
                    to={`/product/${product.id}`}
                    className="w-full bg-[#b9a779] hover:bg-[#054239] text-white py-3 rounded-full font-medium transition-all duration-300 text-center block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>

        {/* Explore All Products Button */}
        <div className="text-center">
          <Link 
            to="/products"
            className="bg-[#b9a779]hover:bg-[#edebe0]] text-white px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg inline-block"
          >
            Explore All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;