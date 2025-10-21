# Muvi

Movie and TV Series listing application with enhanced features including watch providers, trailers, global search, and more.

Originally designed and developed as a requirement for the Frontend position at 57Blocks, now enhanced with comprehensive TV series support and modern animations.

## Features

- 🎬 **Movies & TV Series**: Browse both movies and TV shows with dedicated pages
- 🔍 **Global Search**: Autocomplete search with instant results (minimum 3 characters)
- 🎯 **Content Navigation**: Seamless switching between movies and series
- 📺 **Watch Providers**: Direct links to streaming platforms where content is available
- 🎥 **Trailers & Videos**: Watch trailers directly in the app
- ⭐ **Favorites**: Save your favorite content
- 🏷️ **Keywords & Tags**: Discover content by keywords
- 🎨 **Modern UI**: Smooth animations with Framer Motion
- 📱 **Responsive Design**: Works perfectly on all devices
- 💰 **AdSense Integration**: Monetization support with Google AdSense

## Technologies

### Core

- **HTML5** & **CSS3**
- **JavaScript** (ES6+)
- **React 17.0.2**
  - Functional components with Hooks
  - [React Router Dom v6](https://reactrouter.com/)
  - [Classnames](https://www.npmjs.com/package/classnames)

### UI & Animations

- [Framer Motion 6.5.1](https://www.framer.com/motion/)
- [React FontAwesome](https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react)
- [Spinners React](https://www.npmjs.com/package/spinners-react)
- Custom icon font (Muvi Icons)

### API & Data

- [The Movie Database API (TMDB API)](https://www.themoviedb.org/)
  - Movies, TV Series, Search
  - Watch Providers
  - Videos & Trailers
  - Cast & Crew
  - Reviews & Recommendations

### Monetization

- Google AdSense Integration

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API Account
- (Optional) Google AdSense Account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jesussancher/muvi.git
cd muvi
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
# TMDB API Configuration
# Get your API key and access token from https://www.themoviedb.org/settings/api
REACT_APP_TMDB_ACCESS_TOKEN=your_tmdb_access_token_here
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
```

> **Note**: Google AdSense is pre-configured in the application. The AdSense script and ad units are already set up in the code.

4. Start the development server:

```bash
npm start
```

The application will open at `http://localhost:3000`

### Getting TMDB API Keys

1. Create an account at [The Movie Database](https://www.themoviedb.org/)
2. Go to Settings → API
3. Request an API key
4. Copy both the API Key and the Access Token (Bearer token)
5. Add them to your `.env` file

### Google AdSense Configuration

The application includes Google AdSense integration with the following configuration:

- **Client ID**: `ca-pub-6431549888769819`
- **Ad Slot**: `8622455036` (Muvi - Auto responsive ad)
- **Placements**:
  - Sidebar ad (appears on movie/TV detail pages)
  - Bottom ad (appears after content on detail pages)

The AdSense script is automatically loaded in `public/index.html`, and ad units are configured in the `AdSense` component with responsive, auto-format ads that adapt to different screen sizes.

## Project Structure

```
muvi/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Ads/              # AdSense components
│   │   ├── Buttons/
│   │   ├── Cards/            # Movie/TV cards
│   │   ├── Footer/
│   │   ├── Icons/
│   │   ├── Inputs/
│   │   ├── Loaders/
│   │   ├── Logo/
│   │   ├── Modals/
│   │   ├── Navbars/          # Top & Content Type navbars
│   │   ├── Search/           # Global search with autocomplete
│   │   ├── Tags/
│   │   └── Videos/
│   ├── pages/
│   │   ├── Home/             # Movies home page
│   │   ├── Details/          # Movie details page
│   │   ├── TVSeries/         # TV series pages
│   │   └── Favorites/
│   ├── utils/
│   │   ├── API/              # TMDB API integration
│   │   ├── Auth/
│   │   └── Misc/
│   ├── App.js
│   └── index.js
└── package.json
```

## Features Breakdown

### Movies & TV Series

- Separate pages for movies and TV shows
- Genre filtering
- Pagination support
- Top rated, popular, upcoming lists
- Search functionality

### Detail Pages

Enhanced detail pages include:

- High-quality backdrops
- Movie/show information
- Cast carousel
- Watch providers with direct links
- Trailers and videos
- Keywords and tags
- External links (IMDb, Homepage)
- Production companies/networks
- Google AdSense placements (sidebar & bottom)

### Global Search

- Fixed position search bar
- Autocomplete with 300ms debounce
- Minimum 3 characters to trigger
- Shows both movies and TV shows
- Click to navigate to detail page

### Animations

- Smooth page transitions
- Hover effects on cards
- Animated tab indicators
- Fade-in animations
- Scale and transform effects

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from create-react-app (irreversible)

## Deployment

The application is deployed using Vercel:

[Live Demo](https://muvi-project.vercel.app/)

To deploy your own version:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available for educational purposes.

## Credits

- Movie data provided by [TMDB](https://www.themoviedb.org/)
- Icons by [FontAwesome](https://fontawesome.com/)
- Developed by [Jesús Sánchez](https://github.com/jesussancher)

---

For questions or issues, please open an issue on the [GitHub repository](https://github.com/jesussancher/muvi).
