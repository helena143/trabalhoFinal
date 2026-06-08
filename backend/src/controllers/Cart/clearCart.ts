import { Response } from 'express'
import Cart from '../../models/Cart'

export const clearCart = async (req: any, res: Response) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: 'Não autorizado' })

    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $set: { items: [] } },
      { new: true }
    )

    return res.json({ success: true, message: 'Carrinho limpo' })

  } catch (error: any) {
    console.error('[clearCart]', error)
    return res.status(500).json({ message: 'Erro ao limpar', error: error.message })
  }
}