import { Response } from 'express'
import Cart from '../../models/Cart'

export const updateQuantity = async (req: any, res: Response) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: 'Não autorizado' })

    const { productId, quantity } = req.body
    if (!productId || !quantity || quantity < 1)
      return res.status(400).json({ message: 'productId e quantity obrigatórios' })

    const cart = await Cart.findOne({ user: req.user.id })
    if (!cart) return res.status(404).json({ message: 'Carrinho não encontrado' })

    const item = cart.items.find((i: any) =>
      i.productId === String(productId) ||
      i._id.toString() === String(productId)
    )

    if (!item) return res.status(404).json({ message: 'Item não encontrado' })

    item.quantity = Number(quantity)
    await cart.save()
    return res.json({ success: true, data: cart })

  } catch (error: any) {
    console.error('[updateQuantity]', error)
    return res.status(500).json({ message: 'Erro ao atualizar', error: error.message })
  }
}