import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import MovieRow from "../MovieList/MovieRow";
import { fetchMoviesByGenre, searchMovies } from "../../api.jsx";

function Genres() {
  const [genres] = useState([
    "Action", "Comedy", "Drama", "Romance",
    "Thriller", "Horror", "Sci-Fi", "Animation", "Documentary"
  ]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    if (!query) return setSearchResults([]);
    setLoading(true);
    const results = await searchMovies(query);
    setSearchResults(results);
    setLoading(false);
  };

  const handleGenreClick = async (genre) => {
    setSelectedGenre(genre);
    setLoading(true);
    const genreMovies = await fetchMoviesByGenre(genre); // API call
    setMovies(genreMovies);
    setLoading(false);
  };

  return (
    <>
      <NavBar onSearch={handleSearch} />  {/* Use your existing NavBar */}
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>🎬 Browse by Genre</h1>
      
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", marginBottom: "30px" }}>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            style={{
              padding: "10px 20px",
              borderRadius: "20px",
              border: selectedGenre === genre ? "2px solid #f00" : "1px solid #ccc",
              backgroundColor: selectedGenre === genre ? "#f00" : "#fff",
              color: selectedGenre === genre ? "#fff" : "#000",
              cursor: "pointer"
            }}
          >
            {genre}
          </button>
        ))}
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {searchResults.length > 0 && <MovieRow title="Search Results" movies={searchResults} />}
      {selectedGenre && !loading && <MovieRow title={`${selectedGenre} Movies`} movies={movies} />}
    </>
  );
}

export default Genres;
