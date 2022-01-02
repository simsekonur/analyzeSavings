import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
    isBought: { 
        type: Boolean,
        required: true
    },
    name: { 
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unitCost: {
        type: Number,
        required: true
    },
    totalCommission: {
        type: Number,
        //required: true
    },
    currentPrice: {
        type: Number,
    },
    totalPrice: {
        type: Number,
    },
});

export default recordSchema;