const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bookingSchema = require('./schema/bookingSchema');
const bookingResolver = require('./resolvers/bookingResolver');

dotenv.config();

const app = express();

// Enable CORS for all routes (Allow any origin for deployment)
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Change to your frontend URL after deploying
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs: bookingSchema,
  resolvers: bookingResolver,
});

// Start the Apollo server
async function startServer() {
  await server.start(); // Wait for the server to start
  server.applyMiddleware({ app }); // Apply middleware to the Express app

  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(process.env.PORT || 5000, () => { // Use PORT from environment variable for Vercel
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
      });
    })
    .catch(err => {
      console.error('MongoDB connection error:', err);
    });
}

// Call the function to start the server
startServer();
