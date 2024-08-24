// const express = require('express');
// const {
//   createCustomer,
//   createPrice,
//   createPaymentToken,
//   createPaymentMethod,
//   createSubscription,
//   getSubscription,
//   cancelSubscription,
// } = require('../controllers/subscriptionController');

// const router = express.Router();

// // Route to create a customer
// router.post('/create-customer', createCustomer);

// // Route to create a product and price
// router.post('/create-price', createPrice);

// // Route to create a payment token
// router.post('/create-payment-token', createPaymentToken);

// // Route to create a payment method
// router.post('/create-payment-method', createPaymentMethod);

// // Route to create a subscription
// router.post('/create-subscription', createSubscription);

// // Route to retrieve a subscription
// router.get('/get-subscription/:subscriptionId', getSubscription);

// // Route to cancel a subscription
// router.delete('/cancel-subscription/:subscriptionId', cancelSubscription);

// module.exports = router;
const express = require('express');
const {
  createCustomer,
  createPrice,
  createPaymentMethod,
  attachPaymentMethod,
  createSubscription,
  createTestPaymentMethod,
} = require('../controllers/subscriptionController');

const router = express.Router();

// Route to create a customer
router.post('/create-customer', createCustomer);

// Route to create a product and price
router.post('/create-price', createPrice);

// Route to create a payment method
router.post('/create-payment-method', createPaymentMethod);

// Route to attach payment method to a customer
router.post('/attach-payment-method', attachPaymentMethod);

// Route to create a subscription
router.post('/create-subscription', createSubscription);

// Route to create a test payment method
router.post('/create-test-payment-method', createTestPaymentMethod);

module.exports = router;

