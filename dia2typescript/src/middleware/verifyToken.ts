import { Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { AuthRequest } from '../types/restaurante.types'
 
export const verifyToken = (
  req: AuthRequest,      // ← AuthRequest tiene el campo user
  res: Response,
  next: NextFunction     // ← void porque solo llama a next() o responde
): void => {
 
  // Extraer el token del header Authorization: Bearer <token>
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.status(401).json({ error: 'Authorization header requerido' })
    return
  }
 
  const token = authHeader.split(' ')[1]
  if (!token) {
    res.status(401).json({ error: 'Token no encontrado en el header' })
    return
  }
 
  try {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT_SECRET no configurado')
 
    // verify() retorna JwtPayload | string
    req.user = verify(token, secret)
    next()  // ← token válido, continúa al controller
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' })
  }
}
