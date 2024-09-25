const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bookingSchema = require('./schema/bookingSchema');
const bookingResolver = require('./resolvers/bookingResolver');

dotenv.config();

const app = express();

// Enable CORS for all routes, specifically allowing requests from the frontend (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000',
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
      app.listen(5000, () => {
        console.log('Server is running on port 5000');
      });
    })
    .catch(err => {
      console.log(err);
    });
}

// Call the function to start the server
startServer();
