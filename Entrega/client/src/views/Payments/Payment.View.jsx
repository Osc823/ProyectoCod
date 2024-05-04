import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PC0rYAFLsX4yRRtfNhMynZFDyciRdXkl2opdt0bg8O7dS7vNbYeJ4I37Pyi2jghENUOyHeBhJ8DQBaYA6htjqxJ00arJCJo9b');

const handlePayment = async () => {
  const stripe = await stripePromise;
  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: 'precio-del-producto', quantity: 1 }],
    mode: 'payment',
    successUrl: 'url-de-exito',
    cancelUrl: 'url-de-cancelacion',
  });

  if (error) {
    console.error('Error al procesar el pago:', error);
  }
};

const CheckoutForm = () => {
  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handlePayment}>Pagar</button>
    </div>
  );
};

export default CheckoutForm;
