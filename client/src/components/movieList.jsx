import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getMoviesQuery } from "../queries/queries";
import MovieDetails from "./movieDetails";

function MovieList(props) {
  const [selected, setSelected] = useState(null);

  const displayMovies = () => {
    const { loading, movies } = props.data;
    return loading ? (
      <div>loading movies...</div>
    ) : (
      movies.map((movie) => (
        <li key={movie.id} onClick={() => setSelected(movie.id)}>
          {movie.name}
        </li>
      ))
    );
  };
  return (
    <div>
      <ul id="movie-list">{displayMovies()}</ul>
      <MovieDetails movieId={selected} />
    </div>
  );
}

export default graphql(getMoviesQuery)(MovieList);
