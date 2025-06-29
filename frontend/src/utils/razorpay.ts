import { CartItem } from "../types/Product";
import API from "./api";

// Define Razorpay types
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: any) => void;
  modal: {
    ondismiss: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const initiateRazorpayPayment = async (
  cartItems: CartItem[],
  totalAmount: number,
  onSuccess: (response: any) => void,
  onFailure: () => void
) => {
  try {
    const { data } = await API.get("/getkey");
    const RAZORPAY_KEY = data.key;

    const options: RazorpayOptions = {
      key: RAZORPAY_KEY,
      amount: Math.round(totalAmount * 100), // in paise
      currency: 'INR',
      name: 'Shop Easy',
      description: `Payment for ${cartItems.length} items`,
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '1234567890'
      },
      theme: {
        color: '#2563eb'
      },
      handler: (response: any) => {
        console.log('Payment successful:', response);
        onSuccess(response);
      },
      modal: {
        ondismiss: () => {
          console.log('Payment cancelled');
          onFailure();
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Failed to fetch Razorpay key", error);
    onFailure();
  }
};


export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
