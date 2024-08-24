const express = require('express');
const bodyParser = require('body-parser');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Middleware for JSON parsing
app.use(bodyParser.json());

// Middleware for Stripe webhook raw body
app.use('/api/webhook', webhookRoutes);

// Routes
app.use('/api/subscriptions', subscriptionRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
