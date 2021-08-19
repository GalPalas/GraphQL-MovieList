import { gql } from "apollo-boost";

const getMoviesQuery = gql`
  {
    movies {
      id
      name
    }
  }
`;

export { getMoviesQuery };
