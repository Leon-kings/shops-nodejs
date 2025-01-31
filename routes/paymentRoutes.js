import express from "express";
import { requestPayment, cashOut, checkBalance, callback } from "../controller/payment.js";

const router = express.Router();

router.post("/pay", requestPayment);
router.post("/cashout", cashOut);
router.get("/checkBalance", checkBalance);
router.post("/webhook", callback);

export default router;
