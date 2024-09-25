// resolvers/bookingResolver.js
const Booking = require('../models/Booking'); // Assuming you have a Mongoose model for Booking

const resolvers = {
  Query: {
    bookings: async () => {
      return await Booking.find(); // Fetch all bookings
    },
  },
  Mutation: {
    createBooking: async (_, args) => {
      const newBooking = new Booking({ ...args });
      return await newBooking.save(); // Create and save the booking to MongoDB
    },
  },
};

module.exports = resolvers;
