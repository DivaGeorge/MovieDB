import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ movie, myList, setMyList, isInMyListPage }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/moviedetails/${movie.id}`); // existing MovieDetails route
  };

  const handleAddToList = (e) => {
    e.stopPropagation(); // prevent card click
    if (!myList.some((m) => m.id === movie.id)) {
      setMyList([...myList, movie]);
    }
  };

  const handleRemoveFromList = (e) => {
    e.stopPropagation(); // prevent card click
    setMyList(myList.filter((m) => m.id !== movie.id));
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://dummyimage.com/200x300/cccccc/000000&text=No+Image"
        }
        alt={movie.title || movie.name}
        className="movie-card-poster"
      />
      <div className="movie-card-title">{movie.title || movie.name}</div>

      {isInMyListPage ? (
        <button className="movie-card-btn remove" onClick={handleRemoveFromList}>
          Remove
        </button>
      ) : (
        <button className="movie-card-btn add" onClick={handleAddToList}>
          Add to My List
        </button>
      )}
    </div>
  );
}

export default MovieCard;
