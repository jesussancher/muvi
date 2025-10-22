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
  discoverTVByGenre,
  getAllTVGenresList,
  tmdbSearchTV,
} from "../../utils/API/API";
import "../Home/HomePageStyles.css";
import FilterBar from "../Home/FilterBar";
import Carousel from "../Home/Carousel";
import MoviesList from "../Home/MoviesList";
import HeadVideo from "../Home/HeadVideo";

function TVSeriesPage() {
  document.title = `Muvi | TV Series`;

  const [genresList, setGenresList] = useState([]);
  const [genreSelected, setGenreSelected] = useState({});
  const [tvList, setTVList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  const getGenresList = async () => {
    const genres = await getAllTVGenresList();
    setGenresList(genres.genres);
  };

  const getTVList = async (genre, page = 1) => {
    const byGenre = await discoverTVByGenre(genre, page);
    setTVList(byGenre.results);
  };

  const getTVSearch = async (query) => {
    const byQuery = await tmdbSearchTV(query);
    setTVList(byQuery.results);
  };

  const getTVPagination = async (n) => {
    const newPage = currentPage + n;
    if (newPage === 0) return;
    const byPage = await discoverTVByGenre(genreSelected.id, newPage);
    setCurrentPage(newPage);
    setTVList(byPage.results);
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

  // Request genres
  useEffect(() => {
    getGenresList();
  }, []);

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
  }, []);

  useEffect(() => {
    getTVList(genreSelected.id);
  }, [genreSelected.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (searchValue === "") {
      getTVList(genreSelected.id, currentPage);
    } else {
      if (!searchMode) return;
      getTVSearch(searchValue);
    }
  }, [searchValue, currentPage, searchMode, genreSelected.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={classNames("home-page")}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Ver Muvi - Catálogo de Series de TV Online | Streaming</title>
        <meta
          name="title"
          content="Ver Muvi - Catálogo de Series de TV Online | Streaming"
        />
        <meta
          name="description"
          content="Explora el catálogo completo de series de TV online en Ver Muvi. Encuentra información detallada, trailers, reparto y dónde ver tus series favoritas en streaming."
        />
        <meta
          name="keywords"
          content="series tv, series online, streaming, catálogo series, ver series gratis, trailers series, estrenos series, televisión"
        />
        <link rel="canonical" href="https://vermuvi.com/tv" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vermuvi.com/tv" />
        <meta
          property="og:title"
          content="Ver Muvi - Catálogo de Series de TV Online"
        />
        <meta
          property="og:description"
          content="Explora el catálogo completo de series de TV online. Información detallada, trailers, reparto y dónde ver en streaming."
        />
        <meta property="og:image" content="https://vermuvi.com/muvi-logo.png" />
        <meta property="og:site_name" content="Ver Muvi" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://vermuvi.com/tv" />
        <meta
          name="twitter:title"
          content="Ver Muvi - Catálogo de Series de TV Online"
        />
        <meta
          name="twitter:description"
          content="Explora el catálogo completo de series de TV online. Información, trailers y dónde ver en streaming."
        />
        <meta
          name="twitter:image"
          content="https://vermuvi.com/muvi-logo.png"
        />
      </Helmet>

      <TopNavbar />
      <GlobalSearch />
      <HeadVideo genresList={genresList} isTV={true} />
      <Carousel
        type={"tv-popular"}
        genresList={genresList}
        favoritesList={favoritesList}
        updateFavoritesList={updateFavoritesList}
        isTV={true}
      />
      <Carousel
        type={"tv-top"}
        genresList={genresList}
        favoritesList={favoritesList}
        updateFavoritesList={updateFavoritesList}
        isTV={true}
      />
      <FilterBar
        title={"Genres"}
        genresList={genresList}
        getSelected={getSelectedGenre}
      />
      <MoviesList
        genresList={genresList}
        moviesList={tvList}
        favoritesList={favoritesList}
        updateFavoritesList={updateFavoritesList}
        style={{ minHeight: "80vh" }}
        isTV={true}
      />
      <ButtomNavbar
        currentPage={currentPage}
        genreSelected={genreSelected}
        pageNavigation={getTVPagination}
        getSearchValue={getSearchValue}
        getSearchMode={getSearchMode}
      />
      <div style={{ marginTop: 200 }}></div>
      <Footer />
    </div>
  );
}

export default TVSeriesPage;
