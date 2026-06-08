import { Router } from 'express'
import { addToCart }      from '../controllers/Cart/addToCart'
import { getCart }        from '../controllers/Cart/getCart'
import { removeFromCart } from '../controllers/Cart/removeFromCart'
import { updateQuantity } from '../controllers/Cart/updateQuantity'
import { clearCart }      from '../controllers/Cart/clearCart'
import { auth }           from '../middlewares/auth'

const router = Router()

router.post('/',               auth, addToCart)
router.get('/',                auth, getCart)
router.put('/update',          auth, updateQuantity)
router.delete('/clear',        auth, clearCart)
router.delete('/item/:itemId', auth, removeFromCart)

export default router