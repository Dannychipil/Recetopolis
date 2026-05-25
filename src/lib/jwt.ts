import jwt from 'jsonwebtoken'

const JWT_SECRET = import.meta.env.JWT_SECRET!

export function signJwt(payload: object, options?: jwt.SignOptions) {
  const secret = import.meta.env.JWT_SECRET || process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET no definido')
  return jwt.sign(payload, secret, options)
}

export function verifyJwt(token: string) {
  const secret = import.meta.env.JWT_SECRET || process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET no definido')
  try {
    return jwt.verify(token, secret)
  } catch {
    return null
  }
}   