import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Product from "../models/ProductSchema.js";
import purchasedProduct from "../models/ProductPurchaseSchema.js";
dotenv.config();


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorPayOrder = async (req, res) => {
    try {
        const userId = req.user;
        const { amount, currency, recipt, ProductId } = req.body;

        const product = await Product.findById(ProductId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const newProductPurchase = new purchasedProduct({
            product: ProductId,
            user: userId,
            quantity: 1,
            amount: amount,
            currency: currency,
            status: "Pending",
        })
        const options = {
            amount: amount * 100,
            currency,
            receipt: recipt,
            notes : {
                productId : ProductId,
                userId : userId
            }     
        }
        const order = await razorpay.orders.create(options);

        newProductPurchase.productId = order.id;
        await newProductPurchase.save();
        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ error });
    }
};


export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (razorpay_signature === expectedSignature) {
            const productToBuy = await purchasedProduct.findOne({ productId: razorpay_order_id });
            if (!productToBuy) {
                return res.status(404).json({ error: "purchase record not found" });
            }

            productToBuy.status = "Completed";
            await productToBuy.save();

            res.status(200).json({ "Payment Verification Success" : "Payment Verified Successfully" });
        }else{
            res.status(400).json({status : false, message : "Payment Verification Failed"  });
        }
    }
    catch (error) {
        res.status(500).json({ "Payment Verification Failed" :error });
    }
};