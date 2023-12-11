import jwt from 'jsonwebtoken'
import { promisify } from 'util'

export default async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      throw new Error('Token não foi fornecido!')
    }

    const [, token] = authHeader.split(' ')

    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
    // console.log({ decoded })

    return next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Token não é válido!' })
    }

    return res.status(401).json({ error: error.message })
  }
}
