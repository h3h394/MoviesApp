import React, { useState, createContext, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieState = ({ children }) => {
  const [hiddenMenu, setHiddenMenu] = useState(true);

  const [activeLink, setActiveLink] = useState('Popular');

  const [showPagination, setShowPagination] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [movies, setMovies] = useState([]);

  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  const [popularMovies, setPopularMovies] = useState([]);

  const API_KEY = process.env.REACT_APP_NOT_API_KEY;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.trim() === '') {
      return;
    }
    const searchResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=${currentPage}`
    );
    const searchData = await searchResponse.json();
    setMovies(searchData);
    setShowPagination(false);
  };

  const newPage = (direction) => {
    if (direction === 'next') {
      setCurrentPage(currentPage + 1);
      setIsLoading(true);
    } else if (direction === 'previous' && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const getPopularMovies = async () => {
      const popularMoviesResponse = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=3`
      );
      const popularMoviesData = await popularMoviesResponse.json();
      setPopularMovies(popularMoviesData);
    };
    getPopularMovies();
  });

  useEffect(() => {
    if (search.trim() === '') {
      setShowPagination(true);
    }
    const getMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
      );
      const data = await response.json();
      if (search.trim() === '') {
        setMovies(data);
      }
    };
    getMovies();
  }, [search, API_KEY, currentPage]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1300);
    return () => clearTimeout(loadingTimeout);
  }, [search, API_KEY, currentPage]);

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
