// schema/bookingSchema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Address {
    city: String
    country: String
  }

  type EmergencyContact {
    firstName: String
    lastName: String
    contactNumber: String
  }

  type Booking {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    address: Address!
    emergencyContact: EmergencyContact!
    flightType: String!
    flightNumber: String!
    departureCity: String!
    destinationCity: String!
    departureDate: String!
    departureTime: String!
    returnDate: String!
    returnTime: String!
    flightClass: String!
  }

  input AddressInput {
    city: String
    country: String
  }

  input EmergencyContactInput {
    firstName: String
    lastName: String
    contactNumber: String
  }

  type Query {
    bookings: [Booking]
  }

  type Mutation {
    createBooking(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      address: AddressInput!
      emergencyContact: EmergencyContactInput!
      flightType: String!
      flightNumber: String!
      departureCity: String!
      destinationCity: String!
      departureDate: String!
      departureTime: String!
      returnDate: String!
      returnTime: String!
      flightClass: String!
    ): Booking
  }
`;

module.exports = typeDefs;
