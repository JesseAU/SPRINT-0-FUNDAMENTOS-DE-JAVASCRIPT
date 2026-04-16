import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

// ─────────────────────────────────────────────────────────
// UNIONS — Valores fijos del restaurante
// ─────────────────────────────────────────────────────────

// Estado del plato — más explícito que un boolean disponible
export type EstadoPlato = 'disponible' | 'agotado' | 'suspendido'

// Resultado de operaciones que pueden fallar
export type ResultadoOperacion<T> =
    | { ok: true;  datos: T }
    | { ok: false; error: string }

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

// El payload exacto que el restaurante pone en el JWT
export interface RestaurantePayload {
  email: string   // único campo que pone el restaurante
  iat?:  number   // issued at — lo agrega JWT automáticamente
  exp?:  number   // expiration — lo agrega JWT automáticamente
}

// Type Guard — verificar que un valor es RestaurantePayload
export function esRestaurantePayload(
  valor: unknown
): valor is RestaurantePayload {
  return (
    typeof valor === 'object' &&
    valor !== null &&
    'email' in valor &&
    typeof (valor as RestaurantePayload).email === 'string'
  )
}

// Extiende Request de Express para incluir el usuario del JWT
export interface AuthRequest extends Request {
  user?: RestaurantePayload
}

