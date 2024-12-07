"use client";

import React, { useState, useEffect } from 'react';
import Watchlist from './components/Watchlist';
import { Movie as MovieType } from './types/Movie';
import { fetchMovieInfo, fetchSuggestions } from './components/MovieUtils';
import { useTranslations } from 'next-intl';

const Menu: React.FC = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<MovieType[]>([]); // Nouvel état pour les suggestions

  const t = useTranslations('Menu');

  async function addMovie() {
    if (query) {
      const movie = await fetchMovieInfo(query);
      if (movie) {
        setMovies((prevMovies) => [...prevMovies, movie]);
        setQuery('');
        setSuggestions([]);
      } else {
        alert("Film not found!");
      }
    }
  }

  // Utiliser useEffect pour mettre à jour les suggestions lorsque le query change
  useEffect(() => {
    const getSuggestions = async () => {
      const fetchedSuggestions = await fetchSuggestions(query);
      setSuggestions(fetchedSuggestions);
    };
    getSuggestions();
  }, [query]);

  return (
    <div className="container">
      <h1>{t('title')}</h1>
      <div className="addMovie">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Title of the film..."
          id="movie-title" // Ajoutez un ID pour un ciblage CSS spécifique si besoin
        />
        <button onClick={addMovie}>Add to list</button>
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((movie) => (
              <li key={movie.id} onClick={() => {
                setQuery(movie.title);
                setSuggestions([]); // Vider les suggestions après sélection
              }}>
                {movie.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Watchlist movies={movies} onRemove={(movie) => {
        setMovies(movies.filter(m => m.id !== movie.id));
      }} />
    </div>
  );
};

export default Menu;
