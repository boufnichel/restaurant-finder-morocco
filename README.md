# Restaurant Finder Morocco

A modern React application for discovering top-rated restaurants in Moroccan cities, featuring dynamic filtering and interactive maps.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/boufnichel/restaurant-finder-morocco.git
cd restaurant-finder-morocco
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 🛠️ Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui Components
- Vite

## 📦 Project Structure

```
restaurant-finder-morocco/
├── src/
│   ├── components/
│   │   └── RestaurantListing/
│   │       ├── index.tsx
│   │       └── types.ts
│   ├── services/
│   │   └── maps/
│   ├── utils/
│   └── App.tsx
├── public/
├── .env.example
└── package.json
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📝 Environment Variables

Create a `.env` file with the following variables:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 🌐 Features

- Search and filter restaurants by:
  - Rating
  - Price range
  - Cuisine type
- View restaurant details:
  - Photos
  - Opening hours
  - Contact information
  - Reviews
- Interactive map integration
- Responsive design for all devices

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.