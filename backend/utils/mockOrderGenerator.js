const { v4: uuidv4 } = require('uuid');

const generateMockOrders = (channel) => {
  const formattedChannel = channel.charAt(0).toUpperCase() + channel.slice(1).toLowerCase();
  const orders = [];

  for (let i = 0; i < 5; i++) {
    const orderId = `${formattedChannel.toUpperCase()}-${uuidv4()}`;

    // Randomly assign one of the three statuses
    const rand = Math.random();
    let status = 'pending';
    if (rand < 0.6) status = 'success';      // 60% success
    else if (rand < 0.85) status = 'failed'; // 25% failed
    // else remain 'pending' (15%)

    orders.push({
      channel: formattedChannel,
      orderId,
      status,
    });
  }

  return orders;
};

module.exports = generateMockOrders;
