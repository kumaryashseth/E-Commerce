import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'

export const requireSignIn = async (req, res, next) => {
  try {
    console.log("HEADER:", req.headers.authorization);
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Authorization header missing' })
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader
    if (!token) {
      return res.status(401).json({ success: false, message: 'Invalid authorization format' })
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    console.error('Authentication error:', error)
    return res.status(401).json({ success: false, message: 'Invalid or expired token' })
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user?._id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    if (user.role !== 1) {
      return res.status(403).json({ success: false, message: 'Admin access required' })
    }
    next()
  } catch (error) {
    console.error('Admin middleware error:', error)
    return res.status(500).json({ success: false, message: 'Error checking admin role' })
  }
}