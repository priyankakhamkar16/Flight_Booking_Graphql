// C:\Users\priya\OneDrive\Desktop\Travel_Booking\backend\models\Booking.js

const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const emergencyContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactNumber: { type: String, required: true },
});

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: addressSchema, required: true },
  emergencyContact: { type: emergencyContactSchema, required: true },
  flightType: { type: String, required: true },
  flightNumber: { type: String, required: true },
  departureCity: { type: String, required: true },
  destinationCity: { type: String, required: true },
  departureDate: { type: Date, required: true },
  departureTime: { type: String, required: true },
  returnDate: { type: Date },
  returnTime: { type: String },
  flightClass: { type: String, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
