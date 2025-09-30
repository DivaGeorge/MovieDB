import React, { useEffect, useRef, useState } from "react";
import NavBar from "../NavBar/NavBar";
import HeroBanner from "../HeroBanner/HeroBanner";
import MovieRow from "./MovieRow";
import { fetchTrendingMovies, fetchTopRatedMovies,fetchMoviesByLanguage,searchMovies,fetchPopularTvShows,fetchMoviesByGenre} from "../../api.jsx";




function MovieListPage({myList, setMyList}) {
  console.log("myList type:", typeof myList, Array.isArray(myList), myList);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [hindiMovies, setHindiMovies] = useState([]);
  const [teluguMovies, setTeluguMovies] = useState([]);
  const [tamilMovies, setTamilMovies] = useState([]);
  const [kannadaMovies, setKannadaMovies] = useState([]);
  const [malayalamMovies, setMalayalamMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]); 
  const moviesSection =useRef(null);
  const tvShowsSection =useRef(null);


  const scrollToMovies = () => {
    if (moviesSection.current) {
      moviesSection.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = async (query) => {
    if (!query) return setSearchResults([]);
    const results = await searchMovies(query);
    setSearchResults(results);
  };

  function onMoviesClick(){
    console.log("Movies clicked");
    scrollToMovies();
  }
  
  const scrollToTv = () => {
  if (tvShowsSection.current) {
    tvShowsSection.current.scrollIntoView({ behavior: "smooth" });
  }
};

function onTvShowsClick() {
  console.log("TV Shows clicked");
  scrollToTv();
}



  useEffect(() => {
    async function loadMovies() {
      try {
        const trendingData = await fetchTrendingMovies();
        const topRatedData = await fetchTopRatedMovies();
        const hindiData = await fetchMoviesByLanguage("hi");
        const teluguData = await fetchMoviesByLanguage("te");
        const tamilData = await fetchMoviesByLanguage("ta");
        const kannadaData = await fetchMoviesByLanguage("kn");
        const malayalamData = await fetchMoviesByLanguage("ml");
        const tvData = await fetchPopularTvShows();
        setTrendingMovies(trendingData);
        setTopRatedMovies(topRatedData);
        setHindiMovies(hindiData);
        setTeluguMovies(teluguData);
        setTamilMovies(tamilData);
        setKannadaMovies(kannadaData);
        setMalayalamMovies(malayalamData);
        setTvShows(tvData);

      } catch (err) {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, []);

  if (loading)
    return (
      <p style={{ color: "white", textAlign: "center" }}>Loading...</p>
    );
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <>
      <NavBar onSearch={handleSearch} onMoviesClick={onMoviesClick} onTvShowsclick={onTvShowsClick}/>
      {searchResults.length > 0 && (
        <MovieRow title="Search Results" movies={searchResults} myList={myList} setMyList={setMyList}/>
      )}
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>
        🎬 Welcome to MovieHub
      </h1>
      <HeroBanner />
      <div ref={moviesSection}>
      <MovieRow title="Trending Movies" movies={trendingMovies} myList={myList} setMyList={setMyList} />
      <MovieRow title="Top Rated Movies" movies={topRatedMovies} myList={myList} setMyList={setMyList} />
      <MovieRow title="Hindi Movies" movies={hindiMovies} myList={myList} setMyList={setMyList} />
      <MovieRow title="Telugu Movies" movies={teluguMovies} myList={myList} setMyList={setMyList}/>
      <MovieRow title="Tamil Movies" movies={tamilMovies} myList={myList} setMyList={setMyList}/>
      <MovieRow title="Kannada Movies" movies={kannadaMovies} myList={myList} setMyList={setMyList}/>
      <MovieRow title="Malayalam Movies" movies={malayalamMovies} myList={myList} setMyList={setMyList}/>
      </div>
      <div ref={tvShowsSection}>
      <MovieRow title="Popular TV Shows" movies={tvShows} isTvShow myList={myList} setMyList={setMyList}/>
      </div>
    </>
  );
}

export default MovieListPage;
