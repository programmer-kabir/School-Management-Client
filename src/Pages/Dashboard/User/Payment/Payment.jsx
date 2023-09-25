import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Component/Hooks/useAxiosSecure";
import useAuth from "../../../../Component/Hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
const Payment = ({ price, selectedClass, bookedId,onPaymentSuccess  }) => {
  // console.log(price);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [cardError, setCardError] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, seTransactionId] = useState("");
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      // console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      // console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log("paymentIntent", paymentIntent);
    setProcessing(false);
    if (paymentIntent?.status === "succeeded") {
      seTransactionId(paymentIntent.id);

      // save
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        bookedId,
        date: new Date(),
        classId: selectedClass?._id,
      };
      axios
        .post(`${import.meta.env.VITE_LOCALHOST_KEY}/payments`, payment)
        // console.log(object);
        .then((res) => {
          if (res.data.insertResult) {
            toast.success("payment successfully done");
            onPaymentSuccess();
          }
        });
    }
  };
  console.log(bookedId?._id);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>
      </form>
      {cardError && <p>{cardError}</p>}
    </>
  );
};

export default Payment;
