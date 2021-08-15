const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

let movies = [
  { name: "Homot Shel Tikva", genre: "Fantasy", id: "1", directorId: "1" },
  { name: "Hasandak", genre: "Fantasy", id: "2", directorId: "2" },
  { name: "Hasandak II", genre: "Fantasy", id: "4", directorId: "2" },
  { name: "The Godfather: Part I", genre: "Sci-Fi", id: "3", directorId: "3" },
  {
    name: "The Godfather: Part II",
    genre: "Fantasy",
    id: "5",
    directorId: "3",
  },
  {
    name: "The Godfather: Part III",
    genre: "Fantasy",
    id: "6",
    directorId: "3",
  },
];

let directors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" },
];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return _.find(directors, { id: parent.directorId });
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return _.filter(movies, { directorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db
        return _.find(movies, { id: args.id });
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db
        return _.find(directors, { id: args.id });
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies;
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return directors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
