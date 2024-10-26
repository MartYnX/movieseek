import React from 'react';
import MovieCard from './MovieCard';
import { Movie as MovieType } from '../types/Movie';

interface WatchlistProps {
    movies: MovieType[];
    onRemove: (movie: MovieType) => void; // Ajouter une prop pour supprimer un film
}

const Watchlist: React.FC<WatchlistProps> = ({ movies, onRemove }) => {
    return (
        <div className="watchlist">
            {movies.length === 0 ? (
                <p>No films in the watchlist.</p>
            ) : (
                movies.map(movie => (
                    <MovieCard 
                        key={movie.id} 
                        title={movie.title} 
                        posterPath={movie.poster_path} 
                        overview={movie.overview} 
                        onRemove={() => onRemove(movie)} // Passer la fonction de suppression
                    />
                ))
            )}
        </div>
    );
};

export default Watchlist;
