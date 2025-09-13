import mongoose from "mongoose";

const ProductPurchaseSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency : {
        type: String,
        required: true,
    },
    status : {
        type: String,
        required: true,
    },
    paymentMethod : {
        type: String,
        required: true,
    },
    transactionId : {
        type: String,
        required: true,
    }
   
});

const purchasedProduct = mongoose.model('purchasedProduct', ProductPurchaseSchema);

export default purchasedProduct;