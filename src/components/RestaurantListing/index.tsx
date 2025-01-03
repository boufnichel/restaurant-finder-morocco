import React, { useState } from 'react';
import { Star, Search, Filter } from 'lucide-react';

interface Restaurant {
  name: string;
  description: string;
  rating: number;
  cuisine: string;
  priceRange: string;
  image: string;
}

interface Filters {
  minRating: number;
  cuisine: string;
  priceRange: string;
}

const restaurantsData: Restaurant[] = [
  {
    name: "Boho Café",
    description: "Modern café serving healthy options and artisanal coffee in a stylish, laid-back atmosphere",
    rating: 4.7,
    cuisine: "Café",
    priceRange: "$$",
    image: "/api/placeholder/800/400?text=Boho+Cafe"
  },
  {
    name: "Restaurant Marea",
    description: "Elegant seafood restaurant with fresh Mediterranean cuisine and ocean-inspired ambiance",
    rating: 4.7,
    cuisine: "Seafood",
    priceRange: "$$$",
    image: "/api/placeholder/800/400?text=Restaurant+Marea"
  },
  {
    name: "Dar El Medina",
    description: "Traditional Moroccan restaurant in a beautiful riad setting with authentic flavors",
    rating: 4.4,
    cuisine: "Moroccan",
    priceRange: "$$",
    image: "/api/placeholder/800/400?text=Dar+El+Medina"
  },
  {
    name: "Agha Acham",
    description: "Authentic Middle Eastern flavors and mezze platters in an ornate setting",
    rating: 4.4,
    cuisine: "Middle Eastern",
    priceRange: "$$",
    image: "/api/placeholder/800/400?text=Agha+Acham"
  },
  {
    name: "Dar Rbatia",
    description: "Luxurious Moroccan dining with traditional entertainment and royal ambiance",
    rating: 4.5,
    cuisine: "Moroccan",
    priceRange: "$$$",
    image: "/api/placeholder/800/400?text=Dar+Rbatia"
  }
];

const RestaurantListing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    minRating: 0,
    cuisine: 'all',
    priceRange: 'all'
  });

  // Get unique cuisines and price ranges for filters
  const cuisines = ['all', ...new Set(restaurantsData.map(r => r.cuisine))];
  const priceRanges = ['all', ...new Set(restaurantsData.map(r => r.priceRange))];

  // Filter restaurants based on all criteria
  const filteredRestaurants = restaurantsData.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = restaurant.rating >= filters.minRating;
    const matchesCuisine = filters.cuisine === 'all' || restaurant.cuisine === filters.cuisine;
    const matchesPriceRange = filters.priceRange === 'all' || restaurant.priceRange === filters.priceRange;

    return matchesSearch && matchesRating && matchesCuisine && matchesPriceRange;
  });

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
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-12">
        Top Restaurants in Rabat
      </h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search restaurants or cuisines..."
            className="w-full p-4 pl-12 text-lg border-2 border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Rating Filter */}
          <select
            className="p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            value={filters.minRating}
            onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
          >
            <option value={0}>All Ratings</option>
            <option value={4.5}>4.5+ ★</option>
            <option value={4.0}>4.0+ ★</option>
            <option value={3.5}>3.5+ ★</option>
          </select>

          {/* Cuisine Filter */}
          <select
            className="p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            value={filters.cuisine}
            onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
          >
            {cuisines.map(cuisine => (
              <option key={cuisine} value={cuisine}>
                {cuisine === 'all' ? 'All Cuisines' : cuisine}
              </option>
            ))}
          </select>

          {/* Price Range Filter */}
          <select
            className="p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            value={filters.priceRange}
            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
          >
            {priceRanges.map(price => (
              <option key={price} value={price}>
                {price === 'all' ? 'All Prices' : price}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-gray-600 mb-6">
        Found {filteredRestaurants.length} restaurants
      </div>

      {/* Restaurant Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredRestaurants.map((restaurant, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 bg-gray-200">
              <img 
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 right-4 px-3 py-1 bg-white rounded-full text-gray-700 font-semibold shadow-md">
                {restaurant.priceRange}
              </span>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{restaurant.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold text-gray-800">{restaurant.rating}</span>
                    <div className="flex gap-1">
                      {renderStars(restaurant.rating)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
                  {restaurant.cuisine}
                </span>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                {restaurant.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantListing;