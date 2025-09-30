import React from "react";
import MovieCard from "./MovieCard";
import "./MovieRow.css";

function MovieRow({ title, movies, myList, setMyList }) {
  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-cards">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            myList={myList}
            setMyList={setMyList}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
