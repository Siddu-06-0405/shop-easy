import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import API from "../utils/api";
import { toast } from "sonner";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("reference");
  const navigate = useNavigate();

  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

  useEffect(() => {
    const verifyAndPlaceOrder = async () => {
      try {
        const { data } = await API.get(`/payment/verify-payment-status?paymentId=${paymentId}`);
        if (!data.verified) {
          setStatus("failed");
          toast.error("Payment verification failed.");
          return;
        }

        // Try placing the order from local storage/cart
        const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        const user = JSON.parse(localStorage.getItem("authUser") || "{}");
        if (!user.token || cartData.length === 0) {
          setStatus("failed");
          toast.error("User not logged in or empty cart.");
          return;
        }

        const orderPayload = {
          items: cartData.map((item: any) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          totalAmount: cartData.reduce((sum: any, item: any) => sum + item.price * item.quantity, 0),
          paymentStatus: "Paid",
        };

        await API.post("/orders", orderPayload, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        toast.success("Order placed successfully.");
        localStorage.removeItem("cart");
        setStatus("success");
      } catch (err) {
        console.error("Order placement error:", err);
        setStatus("failed");
        toast.error("Something went wrong.");
      }
    };

    if (paymentId) verifyAndPlaceOrder();
    else setStatus("failed");
  }, [paymentId]);

  const icon = {
    loading: <Loader2 className="w-8 h-8 animate-spin text-blue-500" />,
    success: <CheckCircle className="w-8 h-8 text-green-600" />,
    failed: <XCircle className="w-8 h-8 text-red-500" />,
  };

  const statusText = {
    loading: "Verifying Payment...",
    success: "Payment Successful!",
    failed: "Payment Failed",
  };

  const subText = {
    loading: "Please wait while we confirm your order.",
    success: "Your order has been placed and will be visible in 'My Orders'.",
    failed: "We couldn't verify your payment. Please try again or contact support.",
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md bg-white border-0 shadow-xl">
        <CardHeader className="text-center flex flex-col items-center space-y-2 pt-8">
          {icon[status]}
          <CardTitle className="text-2xl font-bold text-gray-800">{statusText[status]}</CardTitle>
        </CardHeader>

        <CardContent className="text-center px-6 py-4">
          <p className="text-gray-600">{subText[status]}</p>

          {paymentId && status !== "loading" && (
            <div className="mt-4 bg-gray-100 text-gray-800 px-4 py-2 rounded font-mono text-sm break-words">
              Reference ID: {paymentId}
            </div>
          )}
        </CardContent>

        {status !== "loading" && (
          <CardFooter className="flex flex-col gap-3 px-6 pb-8">
            <Button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full"
            >
              Go to Home
            </Button>
            {status === "success" && (
              <Button
                variant="outline"
                onClick={() => navigate("/account/orders")}
                className="w-full border-blue-600 text-blue-700"
              >
                View My Orders
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default PaymentSuccess;