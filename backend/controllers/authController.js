import { comparePassword, hashedPassword } from '../helpers/authHelpers.js'
import userModel from '../models/userModel.js'
import JWT from 'jsonwebtoken'

export const registerController = async (req, res) => {
  try {
    const { name, password, email } = req.body

    if (!name?.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' })
    }
    if (!email?.trim()) {
      return res.status(400).json({ success: false, message: 'Email is required' })
    }
    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required' })
    }

    const normalizedEmail = email.toLowerCase().trim()

    const existingUser = await userModel.findOne({ email: normalizedEmail })
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email is already registered' })
    }

    const hashedPass = await hashedPassword(password)
    await userModel.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPass,
    })

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: 'Something went wrong', error: error.message })
  }
}

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email?.trim() || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const user = await userModel.findOne({ email: normalizedEmail })
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const match = await comparePassword(password, user.password)
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: 'Error logging in', error: error.message })
  }
}

export const testController = (req, res) => {
  res.status(200).json({ success: true, message: 'Protected route access granted' })
}
