import React from "react";
import MovieCard from "../MovieList/MovieCard"; // make sure the path is correct
import "./MyList.css";

function MyList({ myList, setMyList }) {
  if (myList.length === 0) {
    return (
      <div className="mylist-container">
        <h2 className="mylist-title">🎬 My List</h2>
        <p style={{ textAlign: "center" }}>No movies added yet.</p>
      </div>
    );
  }

  return (
    <div className="mylist-container">
      <h2 className="mylist-title">🎬 My List</h2>
      <div className="mylist-cards">
        {myList.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            myList={myList}
            setMyList={setMyList} 
            isInMyListPage={true}// optional, if MovieCard has "remove/add" functionality
          />
        ))}
      </div>
    </div>
  );
}

export default MyList;
