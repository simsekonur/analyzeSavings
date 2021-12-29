import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    unitCost: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        default: function() {
            return Math.round(this.unitCost * this.quantity * 100) / 100;
        }
    },
    bnbPrice: {
        type: Number
    },
    commission: {
        type: Number
    },
    totalCommission: {
        type: Number,
        default: function() {
            return Math.round(this.commission * this.currentBNBPrice * 100) / 100;
        }
    }
});

export default recordSchema;