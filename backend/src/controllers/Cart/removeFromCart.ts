import { Response } from 'express'
import Cart from '../../models/Cart'

export const removeFromCart = async (req: any, res: Response) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: 'Não autorizado' })

    const cart = await Cart.findOne({ user: req.user.id })
    if (!cart) return res.status(404).json({ message: 'Carrinho não encontrado' })

    const { itemId } = req.params
    const before = cart.items.length
    ;(cart.items as any) = cart.items.filter((i: any) =>
      i._id.toString() !== itemId &&
      i.productId !== itemId
    )

    if (cart.items.length === before)
      return res.status(404).json({ message: 'Item não encontrado' })

    await cart.save()
    return res.json({ success: true, data: cart })

  } catch (error: any) {
    console.error('[removeFromCart]', error)
    return res.status(500).json({ message: 'Erro ao remover', error: error.message })
  }
}