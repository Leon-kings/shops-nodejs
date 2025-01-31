import PaypackJs from "paypack-js";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const paypack = new PaypackJs({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

export const requestPayment = async (req, res) => {
  const { paymentNumber, amount } = req.body;
  try {
    const response = await paypack.cashin({
      number: paymentNumber,
      amount,
      environment: "development",
    });
    console.log(response);
    res.status(201).json({
      message: "Payment initiated successfully. Please confirm your payment.",
      data: response.data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const cashOut = async (req, res) => {
  const { paymentNumber, amount } = req.body;
  try {
    const response = await paypack.cashout({
      number: paymentNumber,
      amount,
      environment: "development",
    });
    res.status(201).json({
      message: "Your cashout was made successfully!",
      data: response.data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const checkBalance = async (req, res) => {
  try {
    const response = await paypack.me();
    res.status(200).json(response.data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const callback = async (req, res) => {
  const requestHash = req.get("X-Paypack-Signature");
  const secret = process.env.PAYPACK_WEBHOOK_SIGN_KEY;

  try {
    // Validate webhook authenticity
    const hash = crypto
      .createHmac("sha256", secret)
      .update(req.rawBody)
      .digest("base64");

    if (hash === requestHash || req.method !== "HEAD") {
      // Webhook is valid, process the payload
      handlePaypackWebhook(req.body);
      res.status(200).send("Webhook Received");
    } else {
      // Invalid webhook, reject
      res.status(403).send("Invalid Webhook Signature");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

function handlePaypackWebhook(payload) {
  const paymentStatus = payload.status;

  if (paymentStatus === "success") {
    console.log("Payment successful:", payload);
    // Implement logic for successful payments
  } else {
    console.log("Payment failed:", payload);
    // Implement logic for failed payments
  }
}
