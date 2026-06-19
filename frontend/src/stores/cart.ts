import { reactive, watch } from 'vue'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

interface CartItem {
  _id:      string
  productId: string
  name:     string
  image:    string
  price:    number
  quantity: number
}

interface CartState { items: CartItem[] }

export const cart = reactive<CartState>({
  items: JSON.parse(localStorage.getItem('cart') || '[]')
})

watch(() => cart.items, items => {
  localStorage.setItem('cart', JSON.stringify(items))
}, { deep: true })

const authHeader = () => {
  const token = localStorage.getItem('token')
  
  // Evita enviar strings corrompidas para a API
  if (!token || token === 'undefined' || token === 'null') {
    return null
  }
  
  return { Authorization: `Bearer ${token}` }
}
const mapItems = (items: any[]): CartItem[] =>
  items.map(i => ({
    _id:      String(i._id ?? ''),
    productId: String(i.productId ?? i._id ?? ''),
    name:     String(i.name ?? 'Produto'),
    image:    String(i.image ?? ''),
    price:    Number(i.price ?? 0),
    quantity: Number(i.quantity ?? 1)
  }))

export const loadCart = async () => {
  const headers = authHeader()
  if (!headers) return
  try {
    const { data } = await axios.get(`${apiUrl}/api/cart`, { headers })
    cart.items = mapItems(data?.data?.items ?? [])
  } catch (e) {
    console.error('[loadCart]', e)
  }
}

export const addToCartDirect = async (item: {
  productId: string
  name:      string
  price:     number
  image:     string
  quantity?: number
}) => {
  const headers = authHeader()
  if (!headers) throw new Error('Não autenticado')

  const qty = item.quantity ?? 1

  // Atualiza LOCAL imediatamente (sem esperar API)
  const existing = cart.items.find(i => i.productId === item.productId || i._id === item.productId)
  if (existing) {
    existing.quantity += qty
  } else {
    cart.items.push({
      _id:       item.productId,
      productId: item.productId,
      name:      item.name,
      price:     item.price,
      image:     item.image,
      quantity:  qty
    })
  }

  // Sincroniza com backend em paralelo
  try {
    const { data } = await axios.post(`${apiUrl}/api/cart`, {
      productId: item.productId,
      name:      item.name,
      price:     item.price,
      image:     item.image,
      quantity:  qty
    }, { headers })

    // Se backend retornou itens, sincroniza
    const backendItems = data?.data?.items ?? []
    if (backendItems.length > 0) {
      cart.items = mapItems(backendItems)
    }
  } catch (e) {
    console.error('[addToCartDirect]', e)
    // Mantém o estado local mesmo se API falhar
  }
}

export const addToCart = async (product: any) => {
  console.log('[addToCart] Produto recebido:', product)

  return addToCartDirect({
    productId: String(product._id || product.id),
    name: product.name,
    price: product.price,
    image: product.image
  })
}

export const removeFromCart = async (id: string) => {
  const headers = authHeader()
  cart.items = cart.items.filter(i => i._id !== id)
  if (headers) {
    try {
      await axios.delete(`${apiUrl}/api/cart/item/${id}`, { headers })
    } catch (e) {
      console.error('[removeFromCart]', e)
    }
  }
}

export const clearCart = () => { cart.items = [] }

export const getTotal = () =>
  cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0)

export const getCount = () =>
  cart.items.reduce((acc, i) => acc + i.quantity, 0)