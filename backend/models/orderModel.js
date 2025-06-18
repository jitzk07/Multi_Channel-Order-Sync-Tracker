const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  channel: {
    type: String,
    enum: ['Shopify', 'Amazon','Flipkart'],
    required: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
