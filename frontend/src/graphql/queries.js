import { gql } from '@apollo/client';

export const GET_BOOKINGS = gql`
  query GetBookings {
    bookings {
      id
      firstName
      lastName
      email
      phone
      address {
        city
        country
      }
      emergencyContact {
        firstName
        lastName
        contactNumber
      }
      flightType
      flightNumber
      departureCity
      destinationCity
      departureDate
      departureTime
      returnDate
      returnTime
      flightClass
    }
  }
`;
