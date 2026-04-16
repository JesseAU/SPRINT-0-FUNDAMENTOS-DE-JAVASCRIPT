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

// 📤 PlatoResponseDto — lo que SALE del servidor (GET /menu)
export interface PlatoResponseDto {
  _id: string
  nombre: string
  categoria: Categoria
  precio: number
  stock: number
  disponible: boolean
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
