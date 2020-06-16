import React, { useState, createContext, useEffect } from "react";

export const MovieContext = createContext();

export const MovieState = ({ children }) => {
  // Toggle mobile menu
  const [hiddenMenu, setHiddenMenu] = useState(true);
  // Active nav link
  const [activeLink, setActiveLink] = useState("Popular");
  // Remove the buttons once you search for movies, and there are not more than 20
  const [showPagination, setShowPagination] = useState(true);
  // Loader for images
  const [isLoading, setIsLoading] = useState(false);
  // All the movies
  const [movies, setMovies] = useState([]);
  // Search for the movies
  const [search, setSearch] = useState("");
  // Get and set the current page
  const [currentPage, setCurrentPage] = useState(1);
  // Get popular movies
  const [popularMovies, setPopularMovies] = useState([]);
  // API_KEY
  const API_KEY = "9d4fbae6d45a1f406cc115a66a4de03d";

  // Get movies
  const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
    );
    const data = await response.json();
    if (search.trim() === "") {
      setMovies(data);
    }
  };

  // Form submission for searching movies
  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      return;
    }
    const searchResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=${currentPage}`
    );
    const searchData = await searchResponse.json();
    setMovies(searchData);
    setShowPagination(false);
  };

  // Pagination
  const newPage = (direction) => {
    if (direction === "next") {
      setCurrentPage(currentPage + 1);
      setIsLoading(true);
    } else if (direction === "previous" && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get popular movies

  const getPopularMovies = async () => {
    const popularMoviesResponse = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=3`
    );
    const popularMoviesData = await popularMoviesResponse.json();
    setPopularMovies(popularMoviesData);
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  // Get all the movies when page loads
  useEffect(() => {
    if (search.trim() === "") {
      setShowPagination(true);
    }
    getMovies();
  }, [search, currentPage]);

  // Loading screen
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1300);
    return () => clearTimeout(loadingTimeout);
  }, [movies, currentPage]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        search,
        setSearch,
        activeLink,
        setActiveLink,
        handleSearch,
        currentPage,
        setCurrentPage,
        newPage,
        showPagination,
        setShowPagination,
        isLoading,
        setIsLoading,
        popularMovies,
        setPopularMovies,
        hiddenMenu,
        setHiddenMenu,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
