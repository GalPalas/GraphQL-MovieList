const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

mongoose.connect(
  "mongodb+srv://gal:PsjVnuIeWWFML7At@cluster0.vmtp0.mongodb.net/GraphQLMovieList?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("conneted to database");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => console.log("listening on port 4000"));
