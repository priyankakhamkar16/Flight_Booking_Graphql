import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKINGS } from '../graphql/queries';
import './BookingList.css';

const BookingsList = () => {
  const { loading, error, data } = useQuery(GET_BOOKINGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Function to format timestamp to readable date
  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp)); // Ensure timestamp is parsed as an integer
    return date.toLocaleDateString(); // Format the date to a readable string (e.g., MM/DD/YYYY)
  };

  return (
    <div>
      <h2>Bookings List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Flight Number</th>
            <th>Departure City</th>
            <th>Destination City</th>
            <th>Departure Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {data.bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.firstName}</td>
              <td>{booking.lastName}</td>
              <td>{booking.email}</td>
              <td>{booking.flightNumber}</td>
              <td>{booking.departureCity}</td>
              <td>{booking.destinationCity}</td>
              <td>{formatDate(booking.departureDate)}</td> {/* Format the departure date */}
              <td>{formatDate(booking.returnDate)}</td> {/* Format the return date */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsList;
