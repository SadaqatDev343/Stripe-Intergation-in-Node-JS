const stripe = require('stripe')("Stripe secret key"); // Load your Stripe secret key from environment variables

// // Create a customer
// exports.createCustomer = async (req, res) => {
//   const { email, name } = req.body;

//   try {
//     const customer = await stripe.customers.create({
//       email,
//       name,
//     });
//     res.status(200).json({ customer });
//   } catch (error) {
//     console.error('Error creating customer:', error);
//     res.status(500).json({ error: 'Failed to create customer' });
//   }
// };

// // Create a product and price
// exports.createPrice = async (req, res) => {
//   const { productName, amount, currency, interval } = req.body;

//   try {
//     const product = await stripe.products.create({
//       name: productName,
//     });

//     const price = await stripe.prices.create({
//       unit_amount: amount,
//       currency,
//       product: product.id,
//       recurring: { interval },
//     });

//     res.status(200).json({ product, price });
//   } catch (error) {
//     console.error('Error creating price:', error);
//     res.status(500).json({ error: 'Failed to create price' });
//   }
// };

// // Create a payment token
// exports.createPaymentToken = async (req, res) => {
//   const { number, exp_month, exp_year, cvc } = req.body;

//   try {
//     const token = await stripe.tokens.create({
//       card: {
//         number,
//         exp_month,
//         exp_year,
//         cvc,
//       },
//     });
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error('Error creating payment token:', error);
//     res.status(500).json({ error: 'Failed to create payment token' });
//   }
// };

// // Create a payment method
// exports.createPaymentMethod = async (req, res) => {
//   const { token } = req.body; // Expect the token ID from the frontend

//   try {
//     const paymentMethod = await stripe.paymentMethods.create({
//       type: 'card',
//       card: { token },
//     });
//     res.status(200).json({ paymentMethod });
//   } catch (error) {
//     console.error('Error creating payment method:', error);
//     res.status(500).json({ error: 'Failed to create payment method' });
//   }
// };

// // Create a subscription
// exports.createSubscription = async (req, res) => {
//   const { customerId, priceId, paymentMethodId } = req.body;

//   try {
//     await stripe.paymentMethods.attach(paymentMethodId, {
//       customer: customerId,
//     });

//     await stripe.customers.update(customerId, {
//       invoice_settings: {
//         default_payment_method: paymentMethodId,
//       },
//     });

//     const subscription = await stripe.subscriptions.create({
//       customer: customerId,
//       items: [{ price: priceId }],
//       expand: ['latest_invoice.payment_intent'],
//     });

//     res.status(200).json({ subscription });
//   } catch (error) {
//     console.error('Error creating subscription:', error);
//     res.status(500).json({ error: 'Failed to create subscription' });
//   }
// };

// // Retrieve a subscription
// exports.getSubscription = async (req, res) => {
//   const { subscriptionId } = req.params;

//   try {
//     const subscription = await stripe.subscriptions.retrieve(subscriptionId);
//     res.status(200).json({ subscription });
//   } catch (error) {
//     console.error('Error retrieving subscription:', error);
//     res.status(500).json({ error: 'Failed to retrieve subscription' });
//   }
// };

// // Cancel a subscription
// exports.cancelSubscription = async (req, res) => {
//   const { subscriptionId } = req.params;

//   try {
//     const subscription = await stripe.subscriptions.del(subscriptionId);
//     res.status(200).json({ subscription });
//   } catch (error) {
//     console.error('Error canceling subscription:', error);
//     res.status(500).json({ error: 'Failed to cancel subscription' });
//   }
// };

// Create a customer
exports.createCustomer = async (req, res) => {
  const { email, name } = req.body;
  
  try {
    const customer = await stripe.customers.create({ email, name });
    res.status(200).json({ customer });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
};

// Create a product and price
exports.createPrice = async (req, res) => {
  const { productName, amount, currency, interval } = req.body;

  try {
    // Create a product
    const product = await stripe.products.create({ name: productName });

    // Create a price for the product
    const price = await stripe.prices.create({
      unit_amount: amount,
      currency,
      product: product.id,
      recurring: { interval },
    });

    // Respond with both product and price information
    res.status(200).json({ product, price });
  } catch (error) {
    console.error('Error creating price:', error);
    res.status(500).json({ error: 'Failed to create price' });
  }
};


// Create a payment method
exports.createPaymentMethod = async (req, res) => {
  const { cardToken } = req.body;

  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: { token: cardToken },
    });
    res.status(201).json({ paymentMethod });
  } catch (error) {
    console.error('Error creating payment method:', error);
    res.status(500).json({ error: 'Failed to create payment method' });
  }
};

// Attach payment method to customer
exports.attachPaymentMethod = async (req, res) => {
  const { customerId, paymentMethodId } = req.body;

  try {
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    res.status(200).json({ paymentMethodId });
  } catch (error) {
    console.error('Error attaching payment method:', error);
    res.status(500).json({ error: 'Failed to attach payment method' });
  }
};

// Create a subscription
exports.createSubscription = async (req, res) => {
  const { customerId, priceId, paymentMethodId } = req.body;

  try {
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    });

    res.status(201).json({ subscription });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
};

// Create a test payment method
exports.createTestPaymentMethod = async (req, res) => {
  try {
    const testToken = 'tok_visa'; // Use Stripe's predefined test token
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: { token: testToken },
    });

    res.status(201).json({ paymentMethod });
  } catch (error) {
    console.error('Error creating test payment method:', error);
    res.status(500).json({ error: 'Failed to create test payment method' });
  }
};
