import { Router } from 'express'
import mongoose from 'mongoose'
import Joia from '../models/Joias'
import Pingente from '../models/Pingente'
import Casamento from '../models/Casamento'
import Perfume from '../models/Perfume'
import Relogio from '../models/Relogio'

const router = Router()

router.get('/stats', async (_, res) => {
  try {

    const collections = await mongoose.connection.db
      ?.listCollections()
      .toArray()

    console.log(
  'JOIAS DIRETO:',
  await mongoose.connection.db
    ?.collection('joias')
    .countDocuments()
)

const [joias, pingentes, casamento, perfumes, relogios] =
  await Promise.all([
    Joia.countDocuments(),
    Pingente.countDocuments(),
    Casamento.countDocuments(),
    Perfume.countDocuments(),
    Relogio.countDocuments()
  ])

    console.log({
      joias,
      pingentes,
      casamento,
      perfumes,
      relogios
    })

    res.json({
      success: true,
      totalProdutos:
        joias +
        pingentes +
        casamento +
        perfumes +
        relogios,
      categorias: {
        joias,
        pingentes,
        casamento,
        perfumes,
        relogios
      }
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Erro ao buscar estatísticas'
    })
  }
})

export default router