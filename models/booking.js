const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    }
}, {
    timestamps: true
});

bookingSchema.pre('save', function (next) {
    if (this.checkOutDate <= this.checkInDate) {
        next(new Error('Check-out date must be after check-in date'));
    } else {
        next();
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
