import mongoose from 'mongoose'

const CartItemSchema = new mongoose.Schema({
  product:   { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productId: { type: String },
  name:      { type: String, required: true },
  price:     { type: Number, required: true },
  image:     { type: String, default: '' },
  quantity:  { type: Number, default: 1, min: 1 }
})

const CartSchema = new mongoose.Schema({
  user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [CartItemSchema]
}, { timestamps: true })

const Cart = mongoose.model('Cart', CartSchema)
export default Cart