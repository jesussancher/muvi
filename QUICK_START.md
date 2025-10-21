# Muvi - Quick Start Guide

Get your Muvi application up and running in minutes!

## Prerequisites

- Node.js v14+ installed
- A TMDB account (free)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Get TMDB API Credentials

1. Go to [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Create a free account
3. Navigate to Settings → API
4. Request an API key
5. Copy your:
   - **API Key** (v3 auth)
   - **API Read Access Token** (v4 auth)

## Step 3: Configure Environment Variables

1. Copy the template file:

```bash
cp env.template .env
```

2. Open `.env` and add your TMDB credentials:

```env
REACT_APP_TMDB_ACCESS_TOKEN=your_actual_token_here
REACT_APP_TMDB_API_KEY=your_actual_key_here
```

**Note**: The Google AdSense variables are optional and can be left as-is for development.

## Step 4: Start the Application

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Step 5: Explore the Features

### Movies

- Browse movies on the home page (`/`)
- Filter by genre
- Search for movies
- View detailed information
- Watch trailers
- See where to watch

### TV Series

- Click "Series" in the navigation
- Browse TV shows (`/tv`)
- Filter by genre
- View show details
- Check streaming availability

### Global Search

- Use the search bar in the top-right corner
- Type at least 3 characters
- Get instant results for movies and TV shows
- Click any result to view details

## Optional: Google AdSense Setup

If you want to enable ads:

1. Create a [Google AdSense](https://www.google.com/adsense/) account
2. Get your Publisher ID (starts with `ca-pub-`)
3. Create two ad units:
   - Sidebar ad (for detail pages)
   - Bottom ad (after content)
4. Add to your `.env`:

```env
REACT_APP_ADSENSE_CLIENT_ID=ca-pub-your-id-here
REACT_APP_ADSENSE_SLOT_SIDEBAR=your-sidebar-slot
REACT_APP_ADSENSE_SLOT_BOTTOM=your-bottom-slot
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Common Issues

### "Failed to fetch" errors

- Check that your TMDB credentials are correct in `.env`
- Make sure you copied the Access Token, not just the API key
- Restart the dev server after changing `.env`

### Search not working

- Type at least 3 characters
- Wait 300ms for debounce
- Check browser console for API errors

### Ads not showing

- This is normal if AdSense credentials are not configured
- You'll see placeholder ad spaces instead
- Ads require approval from Google AdSense

## Development Tips

1. **Hot Reload**: Changes to code will automatically reload the page
2. **Console**: Check browser console for errors (F12)
3. **Network Tab**: Monitor API calls in browser DevTools
4. **Responsive**: Test on different screen sizes using browser DevTools

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components (Home, Details, TV)
├── utils/          # API calls and utilities
└── assets/         # Images, styles, icons
```

## Available Pages

- `/` - Movies home
- `/tv` - TV series home
- `/movie/:id` - Movie details
- `/tv/:id` - TV show details
- `/favorites` - Your favorites

## Next Steps

- Explore the codebase
- Check `IMPLEMENTATION_SUMMARY.md` for detailed feature list
- Read `README.md` for full documentation
- Customize the UI to your liking!

## Need Help?

- Check the [TMDB API Documentation](https://developer.themoviedb.org/reference/intro/getting-started)
- Review the `IMPLEMENTATION_SUMMARY.md` for implementation details
- Open an issue on GitHub

---

Happy coding! 🎬
