import Wishlist from '../models/wishlist.model.js';

// Get wishlist for a user
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('items.product');
    res.json(wishlist || { items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
};

// Add to wishlist
export const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, items: [] });
    }

    const alreadyInWishlist = wishlist.items.find(item => item.product.toString() === productId);
    if (alreadyInWishlist) {
      return res.status(400).json({ error: 'Product already in wishlist' });
    }

    wishlist.items.push({ product: productId });
    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
};

// Remove from wishlist
export const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { items: { product: productId } } },
      { new: true }
    );
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
};
