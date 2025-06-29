// backend/controllers/order.controller.js
import Order from '../models/order.model.js';
import User from '../models/user.model.js'

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('userId', 'name email')
      .populate('items.productId', 'title price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'name email');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, totalAmount, paymentStatus } = req.body;

    if (!items?.length || typeof totalAmount !== 'number') {
      return res.status(400).json({ success: false, message: "Invalid order data" });
    }

    // Create and save order
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      paymentStatus,
    });

    await newOrder.save();

    // Update user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    user.ordersCount += 1;
    user.lastOrderDate = new Date();
    user.totalSpent += parseFloat(totalAmount); // Ensures correct numeric addition

    await user.save();

    return res.status(201).json({ success: true, message: 'Order placed successfully.' });
  } catch (err) {
    console.error('Order error:', err);
    return res.status(500).json({ success: false, message: 'Failed to place order.' });
  }
};


// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Order not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update order status' });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete order' });
  }
};

// Get orders of logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId })
  .sort({ createdAt: -1 })
  .populate("items.productId");
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
};

export const getTotalOrders = async (req, res) => {
  try {
    const count = await Order.countDocuments({});
    res.status(200).json({ totalOrders: count });
  } catch (error) {
    console.error('Error fetching total orders:', error);
    res.status(500).json({ error: 'Failed to fetch total order count' });
  }
};

export const getTotalRevenue = async (req, res) => {
  try {
    const orders = await Order.find({ status: { $ne: 'Completed' } });

    const totalRevenue = orders.reduce((sum, order) => {
      return sum + (order.totalAmount || 0);
    }, 0);

    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error('Error calculating revenue:', error);
    res.status(500).json({ error: 'Failed to calculate revenue' });
  }
};

// Get recent orders (last 5)
export const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "name email");

    const formattedOrders = orders.map(order => ({
      id: order._id,
      customer: order.userId?.name || "N/A",
      email: order.userId?.email || "N/A",
      total: `₹${order.totalAmount.toFixed(2)}`,
      status: order.status,
      date: order.createdAt
    }));

    res.status(200).json(formattedOrders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch recent orders" });
  }
};
