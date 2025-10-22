import classNames from "classnames";
import React, { useEffect, useState, Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { TopNavbar, ButtomNavbar, Footer } from "../../components";
import { getAllGenresList } from "../../utils/API/API";
import Carousel from "../Home/Carousel";
import FilterBar from "../Home/FilterBar";
import "../Home/HomePageStyles.css";

function FavoritesPage() {
  const [favoritesList, setFavoritesList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [sortedFilterList, setSortedFilterList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [genresFilterList, setGenresFilterList] = useState([]);
  const [genreSelected, setGenreSelected] = useState({});
  document.title = `Muvi | My Favorites ${
    genreSelected?.name !== undefined
      ? genreSelected?.name === "All"
        ? ""
        : genreSelected?.name
      : ""
  } Movies`;

  const getSelectedGenre = (genre) => {
    setGenreSelected(genre);
  };

  const getGenresList = async () => {
    const genres = await getAllGenresList();
    setGenresList(genres.genres);
  };

  const updateFavoritesList = (list) => {
    setFavoritesList(list);
  };

  const sortListByCategory = (list, genresList) => {
    let listed = {};

    list.forEach((movie) => {
      if (listed[movie.genreId]) {
        listed[movie.genreId].list.push(movie);
      } else {
        listed[movie.genreId] = {};
        listed[movie.genreId].genre = movie.genre;
        listed[movie.genreId].list = [movie];
      }
    });

    const filteredGenres = genresList.filter((genre) =>
      Object.keys(listed).includes(genre.id.toString())
    );
    setGenresFilterList(filteredGenres);
    setSortedList(listed);
  };

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

  // Request now playing movies
  useEffect(() => {
    getGenresList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    sortListByCategory(favoritesList, genresList);
  }, [favoritesList, genresList]);

  useEffect(() => {
    const filteredMoviesList = sortedList[genreSelected.id];

    if (filteredMoviesList) {
      setSortedFilterList([filteredMoviesList]);
    } else {
      setSortedFilterList(sortedList);
    }
  }, [sortedList, genreSelected]);

  return (
    <div
      className={classNames("home-page")}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Mis Favoritos | Ver Muvi - Películas y Series Favoritas</title>
        <meta
          name="title"
          content="Mis Favoritos | Ver Muvi - Películas y Series Favoritas"
        />
        <meta
          name="description"
          content="Accede a tu colección personal de películas y series favoritas en Ver Muvi. Organiza y encuentra fácilmente tus títulos guardados."
        />
        <meta
          name="keywords"
          content="favoritos, películas favoritas, series favoritas, mi lista, películas guardadas"
        />
        <link rel="canonical" href="https://vermuvi.com/favorites" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vermuvi.com/favorites" />
        <meta property="og:title" content="Mis Favoritos | Ver Muvi" />
        <meta
          property="og:description"
          content="Tu colección personal de películas y series favoritas."
        />
        <meta property="og:image" content="https://vermuvi.com/muvi-logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://vermuvi.com/favorites" />
        <meta name="twitter:title" content="Mis Favoritos | Ver Muvi" />
        <meta
          name="twitter:description"
          content="Tu colección personal de películas y series favoritas."
        />
        <meta
          name="twitter:image"
          content="https://vermuvi.com/muvi-logo.png"
        />
      </Helmet>

      <TopNavbar />
      <div style={{ marginTop: 80 }}></div>
      <FilterBar
        genresList={genresFilterList}
        getSelected={getSelectedGenre}
        title={"My Favorites"}
      />
      <div style={{ marginTop: 30 }}></div>
      {Object.values(sortedFilterList).map((genre, index) => {
        return (
          <Fragment key={index + genre}>
            <Carousel
              movies={genre.list}
              title={genre.genre}
              fromFavorites
              genresList={genresList}
              favoritesList={favoritesList}
              updateFavoritesList={updateFavoritesList}
            />
          </Fragment>
        );
      })}
      <ButtomNavbar />
      <div style={{ marginTop: 200 }}></div>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
