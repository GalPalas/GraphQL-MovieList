import React, { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import {
  getDirectorsQuery,
  addMovieMutation,
  getMoviesQuery,
} from "../queries/queries";

function AddMovie(props) {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [directorId, setDirectorId] = useState("");

  const displayDirectors = () => {
    const { loading, directors } = props.getDirectorsQuery;
    if (loading) {
      return <option disabled>loading directors..</option>;
    } else {
      return directors.map((director) => (
        <option key={director.id} value={director.id}>
          {director.name}
        </option>
      ));
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.addMovieMutation({
      variables: {
        name,
        genre,
        directorId,
      },
      refetchQueries: [{ query: getMoviesQuery }],
    });
  };

  return (
    <form id="add-movie" onSubmit={submitForm.bind(this)}>
      <div className="field">
        <label>Movie name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label>Director:</label>
        <select onChange={(e) => setDirectorId(e.target.value)}>
          <option>Select director</option>
          {displayDirectors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default compose(
  graphql(getDirectorsQuery, { name: "getDirectorsQuery" }),
  graphql(addMovieMutation, { name: "addMovieMutation" })
)(AddMovie);
