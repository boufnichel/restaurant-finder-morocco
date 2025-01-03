import React, { useState } from 'react';
import { Star, Search } from 'lucide-react';

// Restaurant data
const restaurantsData = [
  {
    name: "Boho Café",
    description: "Modern café serving healthy options and artisanal coffee",
    rating: 4.7,
    cuisine: "Café",
    priceRange: "$$"
  },
  {
    name: "Restaurant Marea",
    description: "Elegant seafood restaurant with fresh Mediterranean cuisine",
    rating: 4.7,
    cuisine: "Seafood",
    priceRange: "$$$"
  },
  {
    name: "Dar El Medina",
    description: "Traditional Moroccan restaurant in a beautiful riad setting",
    rating: 4.4,
    cuisine: "Moroccan",
    priceRange: "$$"
  },
  {
    name: "Agha Acham",
    description: "Authentic Middle Eastern flavors and mezze platters",
    rating: 4.4,
    cuisine: "Middle Eastern",
    priceRange: "$$"
  },
  {
    name: "Dar Rbatia",
    description: "Luxurious Moroccan dining with traditional entertainment",
    rating: 4.5,
    cuisine: "Moroccan",
    priceRange: "$$$"
  }
];

const RestaurantListing = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter restaurants based on search
  const filteredRestaurants = restaurantsData.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Restaurant Cards */}
      <div className="space-y-6">
        {filteredRestaurants.map((restaurant, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">{restaurant.name}</h2>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-semibold text-gray-800">{restaurant.rating}</span>
                  <div className="flex gap-1">
                    {renderStars(restaurant.rating)}
                  </div>
                </div>
              </div>
              <span className="text-lg font-medium text-gray-600">{restaurant.priceRange}</span>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                {restaurant.cuisine}
              </span>
            </div>
            
            <p className="text-gray-600">
              {restaurant.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantListing;