import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import MovieList from "./components/movieList";
import "./App.css";
import AddMovie from "./components/addMovie";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <MovieList />
        <AddMovie />
      </div>
    </ApolloProvider>
  );
}

export default App;
