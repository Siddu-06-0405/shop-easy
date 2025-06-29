import { CartItem } from "../types/Product";
import API from "./api";

// Define Razorpay options
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
  callback_url: string;
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
  onSuccess: (response: any) => Promise<void>,
  onFailure: () => void
) => {
  try {
    const user = JSON.parse(localStorage.getItem("authUser") || "{}");

    if (!user || !user.token || !user._id) {
      console.error("User not authenticated");
      onFailure();
      return;
    }

    // Get Razorpay Key
    const { data: keyData } = await API.get("/getkey");
    const RAZORPAY_KEY = keyData.key;

    // Create Razorpay Order
    const {
      data: { razorOrder },
    } = await API.post(
      "/payment/checkout",
      {
        amount: totalAmount,
        userId: user._id,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    // Razorpay Options (FIXED)
    const options: any = {
      key: RAZORPAY_KEY,
      amount: razorOrder.amount,
      currency: "INR",
      name: "Shop Easy",
      description: `Payment for ${cartItems.length} items`,
      order_id: razorOrder.id,
      handler: async function (response: any) {
        try {
          const verifyRes = await API.post(
            "/payment/payment-verification",
            response,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          onSuccess(verifyRes.data);
        } catch (err) {
          console.error("Verification failed:", err);
          onFailure();
        }
      },
      prefill: {
        name: user.name || "Customer",
        email: user.email || "email@example.com",
        contact: user.phone || "9999999999",
      },
      theme: {
        color: "#2563eb",
      },
      modal: {
        ondismiss: () => {
          console.log("Payment cancelled");
          onFailure();
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Failed to initiate Razorpay:", error);
    onFailure();
  }
};

// Load Razorpay script
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
