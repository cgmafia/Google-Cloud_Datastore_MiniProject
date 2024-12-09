const express = require('express');
const passport = require('passport');
const customerRoutes = require('./routes/customerRoutes');

const app = express();
app.use(express.json());

// Initialize Passport
require('./middleware/authMiddleware');
app.use(passport.initialize());

// Customer API routes
app.use('/oauth2callback', customerRoutes);

// Error handling
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

// Start server
const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
