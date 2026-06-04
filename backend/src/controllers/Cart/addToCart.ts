import { Request, Response } from "express"
import Cart from "../../models/Cart"

export const addToCart = async (
  req: any,
  res: Response
) => {

  try {

    const {
      productId,
      quantity = 1
    } = req.body

    /*
    |--------------------------------------------------------------------------
    | USER
    |--------------------------------------------------------------------------
    */

    if (!req.user || !req.user.id) {

      return res.status(401).json({

        success: false,
        message: "Não autorizado"

      })

    }

    const userId = req.user.id

    /*
    |--------------------------------------------------------------------------
    | PRODUCT ID
    |--------------------------------------------------------------------------
    */

    if (!productId) {

      return res.status(400).json({

        success: false,
        message: "Produto inválido"

      })

    }

    /*
    |--------------------------------------------------------------------------
    | CART
    |--------------------------------------------------------------------------
    */

    let cart = await Cart.findOne({

      user: userId

    })

    /*
    |--------------------------------------------------------------------------
    | CREATE CART
    |--------------------------------------------------------------------------
    */

    if (!cart) {

      cart = await Cart.create({

        user: userId,

        items: []

      })

    }

    /*
    |--------------------------------------------------------------------------
    | EXISTING ITEM
    |--------------------------------------------------------------------------
    */

    const existingItem =
      cart.items.find((item: any) => {

        if (!item.product) return false

        return (
          item.product.toString() ===
          productId.toString()
        )

      })

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    if (existingItem) {

      existingItem.quantity += Number(quantity)

    } else {

      cart.items.push({

        product: productId,

        quantity: Number(quantity)

      })

    }

    /*
    |--------------------------------------------------------------------------
    | SAVE
    |--------------------------------------------------------------------------
    */

    await cart.save()

    /*
    |--------------------------------------------------------------------------
    | POPULATE
    |--------------------------------------------------------------------------
    */

    const updatedCart =
      await Cart.findOne({

        user: userId

      }).populate("items.product")

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    return res.status(200).json({

      success: true,

      data: updatedCart

    })

  } catch (error: any) {

    console.log(
      "ERRO ADD CART:",
      error
    )

    return res.status(500).json({

      success: false,

      message: "Erro ao adicionar produto",

      error: error.message

    })

  }

}