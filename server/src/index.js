require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const server = new ApolloServer({ typeDefs });

// This code imports the ApolloServer class from apollo-server, along with our (currently undefined) schema from src/schema.js. It then creates a new instance of ApolloServer and passes it the imported schema via the typeDefs property.

// Now that Apollo Server is prepared to receive a schema

// Your GraphQL schema defines what types of data a client can read and write to your data graph. Schemas are strongly typed