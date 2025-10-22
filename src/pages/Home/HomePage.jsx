import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  TopNavbar,
  ButtomNavbar,
  Footer,
  GlobalSearch,
} from "../../components";
import {
  discoverMoviesByGenre,
  getAllGenresList,
  tmdbSearchMovie,
} from "../../utils/API/API";
import "./HomePageStyles.css";
import FilterBar from "./FilterBar";
import Carousel from "./Carousel";
import MoviesList from "./MoviesList";
import HeadVideo from "./HeadVideo";

function HomePage() {
  document.title = `Muvi | Home`;

  const [genresList, setGenresList] = useState([]);
  const [genreSelected, setGenreSelected] = useState({});
  const [moviesList, setMoviesList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  const getGenresList = async () => {
    const genres = await getAllGenresList();
    setGenresList(genres.genres);
  };

  const getMoviesList = async (genre, page = 1) => {
    const byGenre = await discoverMoviesByGenre(genre, page);
    setMoviesList(byGenre.results);
  };

  const getMoviesSearch = async (query) => {
    const byQuery = await tmdbSearchMovie(query);
    setMoviesList(byQuery.results);
  };

  const getMoviesPagination = async (n) => {
    const newPage = currentPage + n;
    if (newPage === 0) return;
    const byPage = await discoverMoviesByGenre(genreSelected.id, newPage);
    setCurrentPage(newPage);
    setMoviesList(byPage.results);
  };

  const getSelectedGenre = (genre) => {
    setGenreSelected(genre);
    setCurrentPage(1);
  };

  const getSearchMode = (mode) => {
    setSearchMode(mode);
  };

  const getSearchValue = (query) => {
    setSearchValue(query.split(" ").join("%20"));
  };

  const updateFavoritesList = (list) => {
    setFavoritesList(list);
  };

  // Request now playing movies
  useEffect(() => {
    getGenresList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function getFavoritesList() {
      const favorites = await localStorage.getItem("favorites");
      if (!favorites) {
        localStorage.setItem("favorites", JSON.stringify([]));
      } else {
        setFavoritesList(JSON.parse(favorites));
      }
    }
    getFavoritesList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getMoviesList(genreSelected.id);
  }, [genreSelected]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (searchValue === "") {
      getMoviesList(genreSelected.id, currentPage);
    } else {
      if (!searchMode) return;
      getMoviesSearch(searchValue);
    }
  }, [searchValue, currentPage, searchMode]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={classNames("home-page")}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Helmet>
        {/* Primary Meta Tags */}
        <title>
          Ver Muvi - Catálogo de Películas y Series Online | Streaming
        </title>
        <meta
          name="title"
          content="Ver Muvi - Catálogo de Películas y Series Online | Streaming"
        />
        <meta
          name="description"
          content="Descubre el catálogo completo de películas y series online en Ver Muvi. Encuentra información detallada, trailers, reparto y dónde ver tus favoritas en streaming."
        />
        <meta
          name="keywords"
          content="películas online, series online, streaming, catálogo películas, ver películas gratis, trailers, estrenos, cine, entretenimiento"
        />
        <link rel="canonical" href="https://vermuvi.com/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vermuvi.com/" />
        <meta
          property="og:title"
          content="Ver Muvi - Catálogo de Películas y Series Online"
        />
        <meta
          property="og:description"
          content="Descubre el catálogo completo de películas y series online. Información detallada, trailers, reparto y dónde ver en streaming."
        />
        <meta property="og:image" content="https://vermuvi.com/muvi-logo.png" />
        <meta property="og:site_name" content="Ver Muvi" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://vermuvi.com/" />
        <meta
          name="twitter:title"
          content="Ver Muvi - Catálogo de Películas y Series Online"
        />
        <meta
          name="twitter:description"
          content="Descubre el catálogo completo de películas y series online. Información, trailers y dónde ver en streaming."
        />
        <meta
          name="twitter:image"
          content="https://vermuvi.com/muvi-logo.png"
        />

        {/* Schema.org JSON-LD for WebSite */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Ver Muvi",
            url: "https://vermuvi.com",
            description: "Catálogo completo de películas y series online",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://vermuvi.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Helmet>

      <TopNavbar />
      <GlobalSearch />
      <HeadVideo genresList={genresList} />
      <Carousel
        type={"new"}
        genresList={genresList}
        favoritesList={favoritesList}
        updateFavoritesList={updateFavoritesList}
      />
      <Carousel
        type={"now"}
        genresList={genresList}
        favoritesList={favoritesList}
        updateFavoritesList={updateFavoritesList}
      />
      <FilterBar
        title={"Genres"}
        genresList={genresList}
        getSelected={getSelectedGenre}
      />
      <MoviesList
        genresList={genresList}
        moviesList={moviesList}
        favoritesList={favoritesList}
        updateFavoritesList={updateFavoritesList}
        style={{ minHeight: "80vh" }}
      />
      <ButtomNavbar
        currentPage={currentPage}
        genreSelected={genreSelected}
        pageNavigation={getMoviesPagination}
        getSearchValue={getSearchValue}
        getSearchMode={getSearchMode}
      />
      <div style={{ marginTop: 200 }}></div>
      <Footer />
    </div>
  );
}

export default HomePage;
