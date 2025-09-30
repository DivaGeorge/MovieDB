import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";

const API_KEY = "2cde2da77336c9da8aaef79ce5b8cbe0";
const BASE_URL = "https://api.themoviedb.org/3";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState([]);


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // Fetch main movie details
        const movieRes = await axios.get(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(movieRes.data);
        console.log("Movie data:", movieRes.data);

        // Fetch credits for director
        const creditsRes = await axios.get(
          `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
        );
        const crew = creditsRes.data.crew;
        const directorData = crew.find((c) => c.job === "Director");
        setDirector(directorData ? directorData.name : "Unknown");
        setCast(creditsRes.data.cast.slice(0, 5)); 
      } catch (error) {
        console.error("Error fetching movie details:",error);
       
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px", color: "red",backgroundColor: "black", borderRadius: "10px", maxWidth: "800px", margin: "20px auto" }}>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        style={{ borderRadius: "10px" }}
      />
      <p><strong>Director:</strong> {director}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(", ")}</p>
      <p><strong>Top Cast:</strong> {cast?.map(c => c.name).join(", ")}</p>
    </div>
  );
}

export default MovieDetail;
