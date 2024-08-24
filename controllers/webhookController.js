const stripe = require('../config/stripe');
const endpointSecret = "we_1PqZ1lP0cOeZkyGgTpfCx8jj"

const handleWebhook = async (req, res) => {
  console.log('function of  webhook');
  const sig = req.headers['stripe-signature'];

  let event;
 console.log(event.type);
 
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the event
  switch (event.type) {
    case 'customer.created':
    
      console.log('Payment succeeded:', event.type);
      break;
    case 'invoice.payment_failed':
      const paymentFailure = event.data.object;
      // Handle payment failure
      console.log('Payment failed:', paymentFailure);
      break;
    case 'customer.subscription.':
      const subscription = event.data.object;
      // Handle subscription cancellation
      console.log('Subscription canceled:', subscription);
      break;
    // Add other relevant event types here
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).send('Received webhook');
};

module.exports = {
  handleWebhook,
};
