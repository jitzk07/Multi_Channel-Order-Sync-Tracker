const Order = require('../models/orderModel');
const generateMockOrders = require('../utils/mockOrderGenerator');

// POST /api/orders/sync/:channel
exports.syncOrders = async (req, res) => {
  const { channel } = req.params;

  console.log(`🔁 Sync request received for channel: ${channel}`);

  // Validate channel
  if (!['shopify', 'amazon'].includes(channel.toLowerCase())) {
    console.error('❌ Invalid channel received');
    return res.status(400).json({ error: 'Invalid channel' });
  }

  // Generate mock orders
  const mockOrders = generateMockOrders(channel);
  console.log(`📦 Generated ${mockOrders.length} mock orders`);

  const results = await Promise.all(
    mockOrders.map(async (order, index) => {
      try {
        const newOrder = new Order(order);
        await newOrder.save();

        console.log(`✅ [${index}] Order saved: ${order.orderId}`);
        return { ...order, saved: true };
      } catch (err) {
        console.warn(`⚠️ [${index}] Order failed: ${order.orderId}`);
        console.warn(`↳ Reason: ${err.message}`);

        return { ...order, saved: false, error: err.message || 'Duplicate or DB error' };
      }
    })
  );

  console.log(`📝 Sync completed for channel: ${channel}`);
  res.status(200).json({ message: 'Sync complete', data: results });
};


// PATCH /api/orders/retry/:orderId
exports.retryOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findOne({ orderId });
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (order.status !== 'failed') return res.status(400).json({ error: 'Order is not failed' });
    console.log(`🔄 Retrying order: ${orderId}`);

    order.status = 'success';
    await order.save();
    console.log(`✅ Order retried successfully: ${orderId}`);

    res.status(200).json({ message: 'Retry successful', order });
  } catch (err) {
    res.status(500).json({ error: 'Retry failed' });
  }
};

// GET /api/orders/stats
exports.getStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: { channel: "$channel", status: "$status" },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

// GET /api/orders
exports.getAllOrders = async (req, res) => {
  const { channel, status } = req.query;

  const filter = {};
  if (channel) filter.channel = channel;
  if (status) filter.status = status;

  try {
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
