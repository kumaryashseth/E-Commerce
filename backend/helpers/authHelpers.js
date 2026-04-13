import bcrypt from 'bcrypt'

export const hashedPassword = async (password) => {
  try {
    const saltRound = 10
    return await bcrypt.hash(password, saltRound)
  } catch (error) {
    console.error('Error hashing password:', error)
    throw new Error('Unable to hash password')
  }
}

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    console.error('Error comparing password:', error)
    return false
  }
}
