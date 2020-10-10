const { gql } = require('apollo-server');

const typeDefs = gql`
type Launch {
  id: ID!
  site: String
  mission: Mission
  rocket: Rocket
  isBooked: Boolean!
}
type Rocket {
  id: ID!
  name: String
  type: String
}

type User {
  id: ID!
  email: String!
  trips: [Launch]!
}

type Mission {
  name: String
  missionPatch(size: PatchSize): String
}

enum PatchSize {
  SMALL
  LARGE
}

type Query {
  launches: [Launch]!
  launch(id: ID!): Launch
  me: User
}

type Mutation {
  bookTrips(launchIds: [ID]!): TripUpdateResponse!
  cancelTrip(launchId: ID!): TripUpdateResponse!
  login(email: String): String # login token
}

type TripUpdateResponse {
  success: Boolean!
  message: String
  launches: [Launch]
}
`;

module.exports = typeDefs;

// The schema will go inside the gql function (between the backticks). The language we'll use to write the schema is GraphQL's schema definition language (SDL).

// For example, our example app needs to be able to fetch a list of upcoming rocket launches, so we should define a Launch type to support that behavior.

//The Launch object type has a collection of fields, and each field has a type of its own. A field's type can be either an object type or a scalar type. A scalar type is a primitive (like ID, String, Boolean, or Int) that resolves to a single value. In addition to GraphQL's built-in scalar types, you can define custom scalar types.

//An exclamation point (!) after a declared field's type means "this field's value can never be null."

//Notice above that the missionPatch field of the Mission type takes an argument named size, which is of the enum type PatchSize


//This Query type defines three available queries for clients to execute: launches, launch, and me.

// The launches query will return an array of all upcoming Launches.
// The launch query will return a single Launch that corresponds to the id argument provided to the query.
// The me query will return details for the User that's currently logged in.

//mutations 
//Queries enable clients to fetch data, but not to modify data. To enable clients to modify data, our schema needs to define some mutations.

// It's good practice for a mutation to return whatever objects it modifies so the requesting client can update its cache and UI without needing to make a followup query.

