import { Response } from 'express'
import Cart from '../../models/Cart'

export const addToCart = async (req: any, res: Response) => {
  try {
    const { productId, name, price, image, quantity = 1 } = req.body

    if (!req.user?.id)  return res.status(401).json({ success: false, message: 'Não autorizado' })
    if (!productId)     return res.status(400).json({ success: false, message: 'productId obrigatório' })
    if (!name || !price) return res.status(400).json({ success: false, message: 'name e price obrigatórios' })

    let cart = await Cart.findOne({ user: req.user.id })
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [] })

    const existing = cart.items.find((i: any) =>
      i.productId === String(productId) ||
      i.product?.toString() === String(productId)
    )

    if (existing) {
      existing.quantity += Number(quantity)
    } else {
      cart.items.push({
        productId: String(productId),
        name,
        price:    Number(price),
        image:    image || '',
        quantity: Number(quantity)
      })
    }

    await cart.save()
    return res.json({ success: true, data: cart })

  } catch (error: any) {
    console.error('[addToCart]', error)
    return res.status(500).json({ success: false, message: 'Erro ao adicionar', error: error.message })
  }
}