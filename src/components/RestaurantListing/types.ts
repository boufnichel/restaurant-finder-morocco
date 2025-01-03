export interface Restaurant {
  name: string;
  address: string;
  rating: number;
  priceRange: string;
  cuisine: string;
  image: string;
  review: {
    text: string;
    author: string;
    rating: number;
  };
  hours: string;
  phone: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Filters {
  rating: number;
  priceRange: string;
  cuisine: string;
}