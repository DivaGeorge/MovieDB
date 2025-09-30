import React from "react";
import "./HeroBanner.css";

function HeroBanner() {
    return(
        <div className="hero-banner" 
        style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg")`,}}>
        
        <div className="hero-content">
            <h1>Discover Your Next Favorite Movie</h1>
            <p>Explore a world of cinema at your fingertips. Find reviews, ratings, and trailers for thousands of movies.</p>
            
            <div className="hero-buttons">
                <button className="btn-primary">Get Started</button>
                <button className="btn-secondary">Learn More</button>
            </div>

            <div className="hero-tags">
                <span>Action</span>
                <span>Sci-Fi</span>
                <span>Adventure</span>
            </div>

        </div>
    </div>


    );

}

export default HeroBanner;