import axios from "axios";

const API_KEY ="2cde2da77336c9da8aaef79ce5b8cbe0";
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL
});

export const fetchTrendingMovies = async () => {
  const response = await tmdb.get(`/trending/movie/week?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchTopRatedMovies = async () => {
  const response = await tmdb.get(`/movie/top_rated?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchMoviesByLanguage = async (languageCode) => {
  const response = await tmdb.get(`/discover/movie?api_key=${API_KEY}&with_original_language=${languageCode}&sort_by=popularity.desc`);
  return response.data.results;
};

export const searchMovies = async (query) => {
  if (!query) return [];
  const response = await tmdb.get(`/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  return response.data.results;
};

export const fetchPopularTvShows = async () => {
  const response = await tmdb.get(`/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
  return response.data.results;
};

export const fetchMoviesByGenre = async (genre) => {
  const genreMap = {
    Action: 28, Comedy: 35, Drama: 18, Romance: 10749,
    Thriller: 53, Horror: 27, "Sci-Fi": 878, Animation: 16, Documentary: 99
  };
 const genreId = genreMap[genre];
  if (!genreId) return [];  
  const response = await tmdb.get(`/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`);
  return response.data.results;
} 