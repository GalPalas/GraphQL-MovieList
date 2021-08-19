import React from "react";
import { graphql } from "react-apollo";
import { getMoviesQuery } from "../queries/queries";

function MovieList(props) {
  const displayMovies = () => {
    const { loading, movies } = props.data;
    return loading ? (
      <div>loading movies...</div>
    ) : (
      movies.map((movie) => <li key={movie.id}>{movie.name}</li>)
    );
  };
  return (
    <div>
      <ul id="movie-list">{displayMovies()}</ul>
    </div>
  );
}

export default graphql(getMoviesQuery)(MovieList);
