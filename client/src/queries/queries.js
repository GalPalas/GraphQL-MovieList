import { gql } from "apollo-boost";

const getMoviesQuery = gql`
  {
    movies {
      id
      name
    }
  }
`;

const getDirectorsQuery = gql`
  {
    directors {
      id
      name
    }
  }
`;

const getMovieQuery = gql`
  query ($id: ID) {
    movie(id: $id) {
      id
      name
      genre
      director {
        id
        name
        age
        movies {
          id
          name
        }
      }
    }
  }
`;

const addMovieMutation = gql`
  mutation AddMovie($name: String!, $genre: String!, $directorId: ID!) {
    addMovie(name: $name, genre: $genre, directorId: $directorId) {
      id
      name
    }
  }
`;

export { getMoviesQuery, getDirectorsQuery, getMovieQuery, addMovieMutation };
