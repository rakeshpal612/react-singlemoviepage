import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Api } from "./context";

const SingleMovie = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movieData, setMovieData] = useState("");

  const fetchApi = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovieData(data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const callApiFunc = setTimeout(() => {
      fetchApi(`${Api}&i=${id}`);
    }, 1000);
    return () => {
      clearTimeout(callApiFunc);
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="movie-section">
        <div className="loading">Loading...</div>
      </div>
    );
  }
  return (
    <>
      <section className="movie-section">
        <div className="movie-card">
          <figure>
            <img src={movieData.Poster} alt="" />
          </figure>
          <div className="card-content">
            <p className="title">{movieData.Title}</p>
            <p className="card-text">{movieData.Released}</p>
            <p className="card-text">{movieData.Genre}</p>
            <p className="card-text">{movieData.imdbRating}</p>
            <p className="card-text">{movieData.Country}</p>
            <NavLink to="/" className="back-btn">
              Go Back
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleMovie;
