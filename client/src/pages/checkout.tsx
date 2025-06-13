import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CartItemWithProduct } from '@shared/schema';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

interface CartResponse {
  cart: {
    id: number;
    sessionId: string;
  };
  items: CartItemWithProduct[];
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const { data: cartData } = useQuery<CartResponse>({
    queryKey: ['/api/cart'],
  });

  const cartItems = cartData?.items || [];
  const total = cartItems.reduce(
    (sum, item) => sum + (item.product.price * item.quantity),
    0
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });

      const { client_secret } = await response.json();

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        }
      });

      if (result.error) {
        setMessage(result.error.message || 'Error en el pago');
      } else {
        setMessage('¡Pago realizado con éxito!');
      }
    } catch (error) {
      setMessage('Error al procesar el pago');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Finalizar Compra</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Resumen del pedido</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between py-2">
            <span>{item.product.title} x{item.quantity}</span>
            <span>${(item.product.price * item.quantity) / 100}</span>
          </div>
        ))}
        <div className="border-t pt-2 font-bold">
          Total: ${total / 100}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Información de la tarjeta
        </label>
        <CardElement className="p-3 border rounded-md" />
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isProcessing ? 'Procesando...' : `Pagar $${total / 100}`}
      </button>

      {message && (
        <div className="mt-4 p-3 rounded-md bg-gray-100 text-center">
          {message}
        </div>
      )}
    </form>
  );
}

export default function Checkout() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Checkout</h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </main>
  );
}