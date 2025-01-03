import React, { useState } from 'react';
import { Star, Search } from 'lucide-react';

const RestaurantListing = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to render filled or empty stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        fill={index < Math.floor(rating) ? '#FFD700' : 'none'}
        stroke={index < Math.floor(rating) ? '#FFD700' : '#CBD5E0'}
        className={`transition-colors ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-12">
        Top Restaurants in Rabat
      </h1>
      
      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search restaurants..."
          className="w-full p-4 pl-12 text-lg border-2 border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {/* Sample Restaurant Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold mb-3">Boho Café</h2>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-semibold text-gray-800">4.7</span>
          <div className="flex gap-1">
            {renderStars(4.7)}
          </div>
        </div>
        
        {/* Additional details can be added here */}
        <p className="text-gray-600">
          Modern café serving healthy options and artisanal coffee
        </p>
      </div>
    </div>
  );
};

export default RestaurantListing;