import { gql } from '@apollo/client';

export const CREATE_BOOKING = gql`
  mutation CreateBooking($firstName: String!, $lastName: String!, $email: String!, $phone: String!, 
    $address: AddressInput!, $emergencyContact: EmergencyContactInput!, $flightType: String!, 
    $flightNumber: String!, $departureCity: String!, $destinationCity: String!, 
    $departureDate: String!, $departureTime: String!, $returnDate: String!, $returnTime: String!, 
    $flightClass: String!) {
    createBooking(firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, 
      address: $address, emergencyContact: $emergencyContact, flightType: $flightType, 
      flightNumber: $flightNumber, departureCity: $departureCity, destinationCity: $destinationCity, 
      departureDate: $departureDate, departureTime: $departureTime, returnDate: $returnDate, 
      returnTime: $returnTime, flightClass: $flightClass) {
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
