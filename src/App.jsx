import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieListPage from "./Components/MovieList/movieListPage";
import MovieDetails from "./Components/MovieList/MovieDeatils";
import Genres from "./Components/Gen/Geners";
import MyList from "./Components/List/MyList"; 

function App() {
  const [myList, setMyList] = useState(() => {
    // Load from localStorage on first render
    const saved = localStorage.getItem("myList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Save to localStorage whenever myList changes
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieListPage myList={myList} setMyList={setMyList} />} />
        <Route path="/moviedetails/:id" element={<MovieDetails />} />
        <Route path="/geners" element={<Genres />} />
        <Route path="/mylist" element={<MyList myList={myList} setMyList={setMyList} />} /> 
      </Routes>
    </Router>
  );
}

export default App;
