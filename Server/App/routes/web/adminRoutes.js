const express = require('express');
const router = express.Router();

// Dummy admin check middleware
const isAdmin = (req, res, next) => {
  // Add real logic here (e.g., check token or session)
  next();
};

// Admin Dashboard route
router.get('/dashboard', isAdmin, (req, res) => {
  res.json({ message: 'Admin Dashboard API working!' });
});

// Get all enquiries
router.get('/enquiries', isAdmin, (req, res) => {
  // Replace this with real DB fetch
  res.json([{ id: 1, name: 'Enquiry A' }, { id: 2, name: 'Enquiry B' }]);
});

// Get all users
router.get('/users', isAdmin, (req, res) => {
  // Replace this with real DB fetch
  res.json([{ id: 1, username: 'admin' }, { id: 2, username: 'user1' }]);
});

module.exports = router;
