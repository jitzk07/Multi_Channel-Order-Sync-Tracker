const express = require('express');
const router = express.Router();

const {
  syncOrders,
  retryOrder,
  getStats,
  getAllOrders
} = require('../controllers/orderController');

router.post('/sync/:channel', syncOrders);          // POST /api/orders/sync/shopify
router.put('/retry/:orderId', retryOrder);        // PATCH /api/orders/retry/ORDER-ID
router.get('/stats', getStats);                     // GET /api/orders/stats
router.get('/', getAllOrders);                      // GET /api/orders?channel=&status=

module.exports = router;
