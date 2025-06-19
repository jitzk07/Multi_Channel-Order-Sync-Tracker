const { v4: uuidv4 } = require('uuid');

const generateMockOrders = (channel) => {
  const formattedChannel = channel.charAt(0).toUpperCase() + channel.slice(1).toLowerCase();
  const orders = [];

  for (let i = 0; i < 5; i++) {
    const orderId = `${formattedChannel.toUpperCase()}-${uuidv4()}`;

    const rand = Math.random();
    let status = 'pending';
    if (rand < 0.5) status = 'success';      
    else if (rand < 0.8) status = 'failed'; 

    orders.push({
      channel: formattedChannel,
      orderId,
      status,
    });
  }

  return orders;
};

module.exports = generateMockOrders;
