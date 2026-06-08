import { Response } from 'express'
import Cart from '../../models/Cart'

export const getCart = async (req: any, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
    return res.json({ success: true, data: cart || { items: [] } })
  } catch (error: any) {
    console.error('[getCart]', error)
    return res.status(500).json({ success: false, error: error.message })
  }
}