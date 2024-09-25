import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOKING } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './BookingForm.css';

const BookingForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      city: '',
      country: '',
    },
    emergencyContact: {
      firstName: '',
      lastName: '',
      contactNumber: '',
    },
    flightType: 'domestic', // default value
    flightNumber: '',
    departureCity: '',
    destinationCity: '',
    departureDate: '',
    departureTime: '',
    returnDate: '',
    returnTime: '',
    flightClass: 'economy', // default value
  });

  const [createBooking] = useMutation(CREATE_BOOKING);
  const [isModalOpen, setModalOpen] = useState(false);

  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      city: '',
      country: '',
    },
    emergencyContact: {
      firstName: '',
      lastName: '',
      contactNumber: '',
    },
    flightType: 'domestic',
    flightNumber: '',
    departureCity: '',
    destinationCity: '',
    departureDate: '',
    departureTime: '',
    returnDate: '',
    returnTime: '',
    flightClass: 'economy',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('emergencyContact') || name.includes('address')) {
      const [section, field] = name.split('.');
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBooking({
        variables: {
          ...formData,
        },
      });
      setModalOpen(true); // Open modal on successful booking
      setFormData(initialFormState); // Reset the form fields after booking
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSeeBookings = () => {
    navigate('/bookings'); // Navigate to bookings list when the button is clicked
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2>Flight Booking Form</h2>
        
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>

        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <label>Phone Number:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div>
          <label>Address:</label>
          <input type="text" name="address.city" placeholder="City" value={formData.address.city} onChange={handleChange} required />
          <input type="text" name="address.country" placeholder="Country" value={formData.address.country} onChange={handleChange} required />
        </div>

        <h3>Emergency Contact</h3>
        <div>
          <label>First Name:</label>
          <input type="text" name="emergencyContact.firstName" value={formData.emergencyContact.firstName} onChange={handleChange} required />
        </div>

        <div>
          <label>Last Name:</label>
          <input type="text" name="emergencyContact.lastName" value={formData.emergencyContact.lastName} onChange={handleChange} required />
        </div>

        <div>
          <label>Contact Number:</label>
          <input type="tel" name="emergencyContact.contactNumber" value={formData.emergencyContact.contactNumber} onChange={handleChange} required />
        </div>

        <h3>Flight Details</h3>

        <div>
          <label>Flight Type:</label>
          <div>
            <input type="radio" name="flightType" value="domestic" checked={formData.flightType === 'domestic'} onChange={handleChange} /> Domestic
            <input type="radio" name="flightType" value="international" checked={formData.flightType === 'international'} onChange={handleChange} /> International
          </div>
        </div>

        <div>
          <label>Flight Number:</label>
          <input type="text" name="flightNumber" value={formData.flightNumber} onChange={handleChange} required />
        </div>

        <div>
          <label>Departure City:</label>
          <input type="text" name="departureCity" value={formData.departureCity} onChange={handleChange} required />
        </div>

        <div>
          <label>Destination City:</label>
          <input type="text" name="destinationCity" value={formData.destinationCity} onChange={handleChange} required />
        </div>

        <div>
          <label>Departure Date:</label>
          <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} required />
        </div>

        <div>
          <label>Departure Time:</label>
          <input type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} required />
        </div>

        <div>
          <label>Return Date:</label>
          <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} required />
        </div>

        <div>
          <label>Return Time:</label>
          <input type="time" name="returnTime" value={formData.returnTime} onChange={handleChange} required />
        </div>

        <div>
          <label>Select Flight Class:</label>
          <select name="flightClass" value={formData.flightClass} onChange={handleChange}>
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="firstClass">First Class</option>
          </select>
        </div>

        <button type="submit">Book Flight</button>
      </form>

      <button className="see-bookings-button" onClick={handleSeeBookings}>
        See Bookings List
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Booking Successful!</h3>
            <p>Your booking has been successfully completed.</p>
            <button onClick={closeModal}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
