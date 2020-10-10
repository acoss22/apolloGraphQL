require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const server = new ApolloServer({ typeDefs });

// This code imports the ApolloServer class from apollo-server, along with our (currently undefined) schema from src/schema.js. It then creates a new instance of ApolloServer and passes it the imported schema via the typeDefs property.
// Now that Apollo Server is prepared to receive a schema
// Your GraphQL schema defines what types of data a client can read and write to your data graph. Schemas are strongly typed

const { createStore } = require('./utils');
const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');
const store = createStore();

const server = new ApolloServer({
  typeDefs,

  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  })
});

//First, we import and call the createStore function to set up our SQLite database. Then, we add the dataSources function to the ApolloServer constructor to connect instances of LaunchAPI and UserAPI to our graph. We also make sure to pass the database to the UserAPI constructor.


server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});


