import React from "react";
import { useGlobalContext } from "./context";
import { NavLink } from "react-router-dom";

const Movies = () => {
  const { movieData, isLoading } = useGlobalContext();
  if (isLoading) {
    return (
      <div>
        <div className="loading">Loading...</div>
      </div>
    );
  }
  return (
    <section className="movie-page">
      <div className="container grid grid-4-col">
        {movieData.map((curMovie, i) => {
          const { Title, Poster, imdbID } = curMovie;
          const movieTitle = Title.substring(0, 15);
          return (
            <NavLink to={`movie/${imdbID}`} key={imdbID}>
              <div className="card">
                <div className="card-info">
                  <h2>
                    {movieTitle.length >= 15 ? `${movieTitle}...` : movieTitle}
                  </h2>
                  <img src={Poster} alt={imdbID} />
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default Movies;
