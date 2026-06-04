import { reactive, watch } from "vue"
import axios from "axios"

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

const apiUrl = "http://localhost:3000"

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

interface CartItem {

  _id: string

  name: string

  image: string

  price: number

  quantity: number

}

interface CartState {

  items: CartItem[]

}

/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/

export const cart = reactive<CartState>({

  items: JSON.parse(
    localStorage.getItem("cart") || "[]"
  )

})

/*
|--------------------------------------------------------------------------
| STORAGE
|--------------------------------------------------------------------------
*/

watch(

  () => cart.items,

  (items) => {

    localStorage.setItem(

      "cart",

      JSON.stringify(items)

    )

  },

  { deep: true }

)

/*
|--------------------------------------------------------------------------
| LOAD CART
|--------------------------------------------------------------------------
*/

export const loadCart = async () => {

  try {

    const token =
      localStorage.getItem("token")

    if (!token) return

    const response = await axios.get(

      `${apiUrl}/api/cart`,

      {

        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    )

    const items =
      response.data?.data?.items || []

    cart.items = items

      .filter(
        (item: any) =>
          item?.product
      )

      .map((item: any) => ({

        _id:
          item.product._id,

        name:
          item.product.name,

        image:
          item.product.image,

        price:
          item.product.price,

        quantity:
          item.quantity || 1

      }))

    console.log(
      "CARRINHO:",
      cart.items
    )

  } catch (error) {

    console.log(
      "ERRO LOAD CART:",
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| ADD TO CART
|--------------------------------------------------------------------------
*/

export const addToCart = async (
  product: any
) => {

  try {

    const token =
      localStorage.getItem("token")

    if (!token) {

      alert("Faça login")

      return

    }

    /*
    |--------------------------------------------------------------------------
    | PRODUCT ID
    |--------------------------------------------------------------------------
    */

    const productId =
      product._id

    console.log(
      "PRODUTO:",
      product
    )

    console.log(
      "PRODUCT ID:",
      productId
    )

    if (!productId) {

      alert(
        "Produto sem _id do MongoDB"
      )

      return

    }

    /*
    |--------------------------------------------------------------------------
    | API
    |--------------------------------------------------------------------------
    */

    const response = await axios.post(

      `${apiUrl}/api/cart`,

      {

        productId,

        quantity: 1

      },

      {

        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    )

    /*
    |--------------------------------------------------------------------------
    | UPDATE CART
    |--------------------------------------------------------------------------
    */

    const items =
      response.data?.data?.items || []

    cart.items = items

      .filter(
        (item: any) =>
          item?.product
      )

      .map((item: any) => ({

        _id:
          item.product._id,

        name:
          item.product.name,

        image:
          item.product.image,

        price:
          item.product.price,

        quantity:
          item.quantity || 1

      }))

    alert(
      "Produto adicionado!"
    )

  } catch (error: any) {

    console.log(
      "ERRO ADD CART:",
      error.response?.data ||
      error
    )

    alert(
      "Erro ao adicionar produto"
    )

  }

}

/*
|--------------------------------------------------------------------------
| REMOVE
|--------------------------------------------------------------------------
*/

export const removeFromCart = (
  id: string
) => {

  cart.items =
    cart.items.filter(

      item =>
        item._id !== id

    )

}

/*
|--------------------------------------------------------------------------
| CLEAR
|--------------------------------------------------------------------------
*/

export const clearCart = () => {

  cart.items = []

}

/*
|--------------------------------------------------------------------------
| TOTAL
|--------------------------------------------------------------------------
*/

export const getTotal = () => {

  return cart.items.reduce(

    (acc, item) => {

      return (
        acc +
        item.price *
        item.quantity
      )

    },

    0

  )

}