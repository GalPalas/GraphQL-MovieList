import React from "react";
import { graphql } from "react-apollo";
import { getMovieQuery } from "../queries/queries";

function MovieDetails(props) {
  const displayMovieDetails = () => {
    const { movie } = props.data;
    if (movie) {
      return (
        <div>
          <h2>{movie.name}</h2>
          <p>{movie.genre}</p>
          <p>{movie.director.name}</p>
          <p>All movies by this director:</p>
          <ul className="other-movies">
            {movie.director.movies.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No moive selected...</div>;
    }
  };

  return <div className="movie-details">{displayMovieDetails()}</div>;
}

export default graphql(getMovieQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.movieId,
      },
    };
  },
})(MovieDetails);
