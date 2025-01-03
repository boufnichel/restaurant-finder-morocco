import React, { useState } from 'react';
import { Star, Search } from 'lucide-react';

const RestaurantListing = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Top Restaurants in Rabat
      </h1>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search restaurants..."
          className="w-full p-2 pl-8 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
      </div>

      {/* Sample Restaurant Card */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold">Boho Café</h2>
        <div className="flex items-center mt-2">
          <span className="text-lg mr-2">4.7</span>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              className={`inline ${
                index < Math.floor(4.7)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantListing;