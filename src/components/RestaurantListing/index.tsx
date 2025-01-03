import React, { useState } from 'react';
import { Card, Badge, Select, TextInput, Button } from '@rewind-ui/core';
import { StarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

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

  const cuisines = ['all', ...new Set(restaurantsData.map(r => r.cuisine))];
  const priceRanges = ['all', ...new Set(restaurantsData.map(r => r.priceRange))];

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
      <StarIcon
        key={index}
        className={`h-5 w-5 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Top Restaurants in Rabat
      </h1>
      
      <Card className="mb-8">
        <Card.Header>
          <div className="flex items-center space-x-2">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            <span className="text-lg font-semibold">Search & Filters</span>
          </div>
        </Card.Header>
        <Card.Body>
          {/* Search Bar */}
          <div className="mb-6">
            <TextInput
              placeholder="Search restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="lg"
              radius="lg"
              leftIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              value={filters.minRating.toString()}
              onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
              size="lg"
              radius="lg"
            >
              <option value="0">All Ratings</option>
              <option value="4.5">4.5+ ★</option>
              <option value="4.0">4.0+ ★</option>
              <option value="3.5">3.5+ ★</option>
            </Select>

            <Select
              value={filters.cuisine}
              onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
              size="lg"
              radius="lg"
            >
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>
                  {cuisine === 'all' ? 'All Cuisines' : cuisine}
                </option>
              ))}
            </Select>

            <Select
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              size="lg"
              radius="lg"
            >
              {priceRanges.map(price => (
                <option key={price} value={price}>
                  {price === 'all' ? 'All Prices' : price}
                </option>
              ))}
            </Select>
          </div>
        </Card.Body>
      </Card>

      <div className="text-gray-600 mb-6 flex items-center justify-between">
        <span>Found {filteredRestaurants.length} restaurants</span>
        <Button
          color="gray"
          onClick={() => setFilters({ minRating: 0, cuisine: 'all', priceRange: 'all' })}
        >
          Clear Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredRestaurants.map((restaurant, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
              <img 
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              <Badge
                color="white"
                className="absolute top-4 right-4 shadow-lg"
              >
                {restaurant.priceRange}
              </Badge>
            </div>

            <Card.Body>
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
              
              <Badge
                color="blue"
                className="mb-4"
              >
                {restaurant.cuisine}
              </Badge>
              
              <p className="text-gray-600 leading-relaxed">
                {restaurant.description}
              </p>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RestaurantListing;