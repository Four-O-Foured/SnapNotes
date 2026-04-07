import { asyncHandler } from "../utils/asyncHandler.js"
import Razorpay from "razorpay";
import { tierDetails } from "../utils/helper.js";
import { Payment } from "../models/Payments.model.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createSubscription = asyncHandler(async (req, res) => {
    const {id, isYearly} = req.body;
    const plan = tierDetails(id, isYearly);

    const options = {
        amount: plan.price,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
    }

    const order = await razorpay.orders.create(options);

    if(!order) {
        return res.status(500).json({message: "Failed to create order"});
    }

    const payment = await Payment.create({
        orderId: order.id,
        amount: plan.price,
        currency: "INR",
        status: "PENDING",
    });

    res.status(200).json({success: true, order});
    
    
})