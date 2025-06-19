// utils/updatePendingOrders.js
const Order = require('../models/orderModel');

const autoUpdatePendingOrders = async () => {
  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

  await Order.updateMany(
    {
      status: 'pending',
      createdAt: { $lte: twoMinutesAgo },
    },
    { $set: { status: 'success' } }
  );
};

module.exports = autoUpdatePendingOrders;
