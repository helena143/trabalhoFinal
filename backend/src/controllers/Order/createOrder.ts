import { Response } from 'express'
import Order from '../../models/Order'
import Cart from '../../models/Cart'

export const createOrder = async (req: any, res: Response) => {
  try {
    if (!req.user?.id)
      return res.status(401).json({ success: false, message: 'Não autorizado' })

    const userId = req.user.id
    const { shipping = 0, discount = 0, address = '' } = req.body

    // Busca carrinho SEM populate (dados já estão no item)
    const cart = await Cart.findOne({ user: userId })
    console.log('CARRINHO:', JSON.stringify(cart, null, 2))

    let items: any[] = []
    let subtotal = 0

    // ── USA ITENS DO CARRINHO ──────────────────────────────────────────
    if (cart && cart.items && cart.items.length > 0) {
      items = (cart.items as any[])
        .filter((item: any) => item && (item.productId || item.product))
        .map((item: any) => ({
          product:  item.productId || item.product || item._id,
          name:     item.name     || 'Produto',
          price:    Number(item.price)    || 0,
          quantity: Number(item.quantity) || 1,
          image:    item.image    || ''
        }))

      subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0)

      // Limpa carrinho
      await Cart.findOneAndUpdate(
        { user: userId },
        { $set: { items: [] } }
      )
    }

    // ── FALLBACK: itens enviados pelo frontend ─────────────────────────
    else if (Array.isArray(req.body.items) && req.body.items.length > 0) {
      items = req.body.items
        .filter((item: any) => item && (item._id || item.product || item.productId))
        .map((item: any) => ({
          product:  item._id || item.product || item.productId,
          name:     item.name     || 'Produto',
          price:    Number(item.price)    || 0,
          quantity: Number(item.quantity) || 1,
          image:    item.image    || ''
        }))

      subtotal = req.body.subtotal ||
        items.reduce((acc, i) => acc + i.price * i.quantity, 0)
    }

    else {
      return res.status(400).json({ success: false, message: 'Carrinho vazio' })
    }

    if (items.length === 0)
      return res.status(400).json({ success: false, message: 'Nenhum item válido' })

    console.log('ITEMS FINAIS:', items)

    const total = Math.max(subtotal + Number(shipping) - Number(discount), 0)

    const order = await Order.create({
      user:     userId,
      items,
      subtotal,
      shipping: Number(shipping),
      discount: Number(discount),
      total,
      address,
      status:   'pending'
    })

    return res.status(201).json({
      success: true,
      message: 'Pedido criado com sucesso',
      order
    })

  } catch (error: any) {
    console.error('ERRO AO CRIAR PEDIDO:', error)
    return res.status(500).json({
      success: false,
      message: 'Erro ao criar pedido',
      error: error.message
    })
  }
}