import Order from '../../models/Order';
import jwt from 'jsonwebtoken';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  try {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const orders = await Order.find({ user: userId })
      .sort({
        createdAt: 'desc'
      })
      .populate({
        path: 'products.product',
        model: 'Product'
      });
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(403).send('Please login again');
  }
}