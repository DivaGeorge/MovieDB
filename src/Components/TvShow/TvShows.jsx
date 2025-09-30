import React, { useState, useEffect } from "react";
import axios from "axios";

function TvShows() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=2cde2da77336c9da8aaef79ce5b8cbe0&language=en-US&page=1`
        );
        setShows(response.data.results);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    };

    fetchTvShows();
  }, []);

  return (
    <div>
      <h2>Popular TV Shows</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {shows.map((show) => (
          <div key={show.id} style={{ width: "200px" }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
              alt={show.name}
              style={{ width: "100%" }}
            />
            <h4>{show.name}</h4>
            <p>Rating: {show.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TvShows;
