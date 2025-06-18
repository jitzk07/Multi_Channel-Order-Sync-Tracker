const { v4: uuidv4 } = require('uuid');

const generateMockOrders = (channel) => {
  const formattedChannel = channel.charAt(0).toUpperCase() + channel.slice(1).toLowerCase();
  const orders = [];

  for (let i = 0; i < 5; i++) {
    const orderId = `${formattedChannel.toUpperCase()}-${uuidv4()}`;
    const isSuccess = Math.random() < 0.8;


    orders.push({
      channel: formattedChannel,
      orderId,
      status: isSuccess ? 'success' : 'failed'
    });
  }

  return orders;
};

module.exports = generateMockOrders;
