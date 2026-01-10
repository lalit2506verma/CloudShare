import { useEffect, useRef, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useCredits } from "../contexts/UserCreditsContext";
import { getUserCredits } from "../services/UserCreditsService";
import { useAuth } from "../contexts/AuthContext";
import { AlertCircle, Check, CheckCheck, CreditCard, Loader2 } from "lucide-react";
import { placeOrder, verifyPayment } from "../services/PaymentService";

const SubscriptionPage = () => {
  // Subscription Plan array
  const plans = [
    {
      id: "premium",
      name: "Premium",
      credits: 500,
      price: 500,
      recommended: false,
      feature: [
        "Upload up to 600 files",
        "Access to all basic features",
        "Priority support",
      ],
    },
    {
      id: "ultimate",
      name: "Ultimate",
      credits: 1400,
      price: 1000,
      recommended: true,
      feature: [
        "Upload up to 1400 files",
        "Access to all premium feature",
        "Priority Support",
        "Advanced analytics",
      ],
    },
  ];

  const [processingPayment, setProcessingPayment] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [razorPayLoaded, setRazorPayLoaded] = useState(false);
  const [message, setMessage] = useState("");

  const razorPayScriptRef = useRef(null);
  const { credits, setCredits, fetchUserCredits } = useCredits();
  const { user, isAuthenticated } = useAuth();

  // Load Razorpay Script
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v2/checkout.js";
      script.async = true;
      script.onload = () => {
        console.log("Razorpay script loaded successfully");
        setRazorPayLoaded(true);
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        setMessage(
          "Payment gateway failed to load. Please refresh the page and try again"
        );
        setMessageType("error");
      };
      document.body.appendChild(script);
      razorPayScriptRef.current = script;
    } else {
      setRazorPayLoaded(true);
    }

    return () => {
      if (
        razorPayScriptRef.current &&
        document.body.contains(razorPayScriptRef.current)
      ) {
        document.body.removeChild(razorPayScriptRef.current);
      }
    };
  }, [isAuthenticated]);

  // Fetch user Credits
  useEffect(() => {
    const loadUserCredits = async () => {
      try {
        const response = await getUserCredits();
        // console.log('Fromm Subscription Page', response);

        setCredits(response.credits);
      } catch (error) {
        console.log("Error in fetching user Credits", error);
        setMessage("Failed to load current credits. Please try again later");
        setMessageType("error");
      }
    };

    loadUserCredits();
  }, []);

  // Handle Purchase button click
  const handlePurchase = async (plan) => {
    if (!razorPayLoaded) {
      setMessageType("error");
      setMessage(
        "Payment gateway is still loading. Please wait a moment and try again"
      );
      return;
    }

    // loading - true
    setMessage("");
    setMessageType("");
    setProcessingPayment(true);

    try {
      const order = {
        planId: plan.id,
        amount: plan.price * 100, // Razorpay expects amount in paisa
        currency: "INR",
        credits: plan.credits,
      };
      const response = await placeOrder(order);
      console.log(response);

      // Open the razorpay window
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: plan.price * 100,
        currency: "INR",
        name: "CloudShare",
        description: `Purchase ${plan.credits} credits`,
        order_id: response.orderId,
        modal: {
          ondismiss: function () {
            setProcessingPayment(false);
            setMessage("Payment cancelled");
            setMessageType("error");
          },
        },
        handler: async function (response) {
          try {
            const transaction = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId: plan.id,
            };
            const verifyResponse = await verifyPayment(transaction);

            if (verifyResponse.success) {
              if (verifyResponse.credits) {
                console.log("Updating credits to: ", verifyResponse.credits);
                setCredits(verifyResponse.credits);
              } else {
                console.log("Credits not in response, fetching latest credits");
                await fetchUserCredits();
              }

              // setting the message
              setMessage(`Payment successfully ${plan.name} plan activated.`);
              setMessageType("success");
            } else {
              setMessage("Payment verification failed. Please contact support");
              setMessageType("error");
            }
          } catch (error) {
            console.log("Payment Verification failed", error);
            setMessage("Payment Failed. Please contact support.");
            setMessageType("error");
          }
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        },
        theme: {
          color: "#3882F6",
        },
      };

      // Loading the razorpay screen
      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        throw new Error("Razorpay SDK not loaded");
      }
    } catch (error) {
      console.error("Payment initiation error", error);
      setMessage("Failed to initiate Payment. Please try again later.");
      setMessageType("error");
    } finally {
      setProcessingPayment(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Subscription">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Subscription Plans</h1>

        <p className="text-gray-600 mb-6">Choose a plan that works for you</p>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              messageType === "error"
                ? "bg-red-50 text-red-700"
                : messageType === "success"
                ? "bg-green-50 text-green-700"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            {messageType == "success" && <CheckCheck size={20}/>}
            {messageType === "error" && <AlertCircle size={20} />}
            {message}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="text-purple-500" />
              <h2 className="text-lg font-medium">
                {" "}
                Current Credits:{" "}
                <span className="font-bold text-purple-500">{credits}</span>
              </h2>
            </div>

            <p className="text-sm text-gray-600 mt-2">
              You can upload {credits} more files on cloud with your current
              credits.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-xl p-6 ${
                plan.recommended
                  ? "border-purple-200 bg-purple-50 shadow-md"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.recommended && (
                <div className="inline-block bg-purple-500 text-white text-xs font-semibold rounded-2xl py-0.5 px-2 mb-2">
                  RECOMMENDED
                </div>
              )}

              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold">₹ {plan.price}</span>
                <span className="text-gray-500">
                  {" "}
                  for {plan.credits} credits
                </span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.feature.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check
                      size={18}
                      className="text-green-500 mr-2 mt-0.5 shrink-0"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePurchase(plan)}
                disabled={processingPayment}
                className={`w-full py-2 rounded-md font-medium transition-colors ${
                  plan.recommended
                    ? "bg-purple-500 text-white hover:bg-purple-600"
                    : "bg-white border border-purple-500 text-purple-500 hover:bg-purple-50"
                } disabled:opacity-50 flex items-center justify-center gap-2`}
              >
                {processingPayment ? (
                  <>
                    <Loader2 size={16} className="animate-ping" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Purchase Plan</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-medium mb-2">How Credits work</h3>

        <p className="text-sm text-gray-700">
          Each file consumes 1 credits. New users can start with 5 free credits.
          Credits never expire and can only be used at once. If you run out of
          credits, you can purchase more by any of the plans above.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPage;
