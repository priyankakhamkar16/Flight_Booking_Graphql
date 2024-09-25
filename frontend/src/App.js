// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import BookingForm from './components/BookingForm';
import BookingsList from './components/BookingsList';

const client = new ApolloClient({
  uri: 'https://flight-booking-graphql.vercel.app/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<BookingForm />} />
          <Route path="/bookings" element={<BookingsList />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
