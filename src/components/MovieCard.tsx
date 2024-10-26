import React from 'react';
import Image from 'next/image';

interface MovieCardProps {
    title: string;
    posterPath: string;
    overview: string;
    onRemove: () => void;
    onSave: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, posterPath, overview, onRemove, onSave }) => {
    return (
        <div className="movieCard">
            <Image
                src={`https://image.tmdb.org/t/p/w200${posterPath}`}
                alt={title}
                width={200}
                height={300}
                sizes="200px"
                style={{ width: '30%', height: 'auto' }} />
            <div>
                <h2>{title}</h2>
                <p>{overview}</p>
                <div className="buttonGroup">
                    <button onClick={onSave}>Save</button> {/* Save the movie */}
                    <button onClick={onRemove}>Remove</button> {/* Remove from list */}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
