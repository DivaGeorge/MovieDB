import React, { useState } from "react";
import "./NavBar.css"
import { Form } from "react-router-dom";
import Genres from "../Gen/Geners";
import { useNavigate} from "react-router-dom";





function NavBar({onSearch,onMoviesClick,onTvShowsclick}) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleGenreClick = () => {
        navigate("/geners");
    }

    const handleMyListClick = () => {   
        navigate("/mylist");
    }



    return (
         <nav className="navbar">
            {/* Navbar log */}
            <div className="navbar-logo">MovieHub</div>
            {/* Navbar links */}
            <ul className="navbar-links">
                 <li>Home</li>
                <li onClick={onMoviesClick} style={{cursor:"pointer"}}>Movies</li>
                <li onClick={onTvShowsclick} style={{cursor:"pointer"}}>TV Shows</li>
                 <li onClick={handleGenreClick} style={{cursor:"pointer"}}>Genres</li>
                <li onClick={handleMyListClick} style={{cursor:"pointer"}}>My List</li>
            </ul>
            {/* Search bar */}
            <div className="navbar-search">
                <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search movies, TV shows..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)} />
                <button type="submit">🔍</button>
                </form>
            </div>
        </nav>

    );

       

}
export default NavBar;