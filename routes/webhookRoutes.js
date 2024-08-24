const express = require('express');
const { handleWebhook } = require('../controllers/webhookController');
const router = express.Router();
  console.log('route of  webhook');
  
// Stripe requires raw body for webhooks
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = router;
