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
async function startServer() {
  const server = new ApolloServer({
    typeDefs: bookingSchema,
    resolvers: bookingResolver,
    introspection: true, // Enable introspection to allow Playground in production
    playground: true,    // Enable the Playground on production
  });

  await server.start(); // Wait for the server to start
  server.applyMiddleware({ app, path: '/graphql' }); // Apply middleware to the Express app

  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
      });
    })
    .catch(err => {
      console.error('MongoDB connection error:', err);
    });
}

// Call the function to start the server
startServer();

app.get('/', (req, res) => {
  res.send('Flight Booking GraphQL Backend is running!');
});
