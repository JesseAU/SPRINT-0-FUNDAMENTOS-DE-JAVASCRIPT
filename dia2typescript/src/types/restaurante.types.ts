import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

// ─────────────────────────────────────────────────────────
// ENUMS — Valores fijos del restaurante
// ─────────────────────────────────────────────────────────

export enum Categoria {
  ENTRADA = 'Entradas',
  PRINCIPAL = 'Segundos',
  POSTRE = 'Postres',
  BEBIDA = 'Bebidas'
}

// ─────────────────────────────────────────────────────────
// INTERFACES — Modelos del restaurante
// ─────────────────────────────────────────────────────────

export interface Plato {
  _id: string
  nombre: string
  categoria: Categoria
  precio: number
  stock: number
  disponible: boolean
}

// 📥 CreatePlatoDto — lo que LLEGA al servidor (POST /menu)
export interface CreatePlatoDto {
  nombre: string
  categoria: Categoria
  precio: number
  stock: number
}

// 📤 PlatoResponseDto extiende Plato — hereda todos sus campos
export interface PlatoResponseDto extends Plato {
  // Hereda todo de Plato automáticamente
}

// 🔄 UpdatePlatoDto — todos los campos opcionales para PUT
export interface UpdatePlatoDto {
  nombre?:    string
  categoria?: Categoria
  precio?:    number
  stock?:     number
}

export interface User {
  _id: string
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface LoginResponseDto {
  token: string
  message: string
}

// ─────────────────────────────────────────────────────────
// INTERFACES — Autenticación y middleware
// ─────────────────────────────────────────────────────────

// Extiende Request de Express para incluir el usuario del JWT
export interface AuthRequest extends Request {
  user?: JwtPayload | string
}
