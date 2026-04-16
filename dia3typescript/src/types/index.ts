import { Categoria } from './restaurante.types';

// Usando el enum correctamente
const categoriaDeHoy: Categoria = Categoria.PRINCIPAL;
console.log(categoriaDeHoy);

// Ver todos los valores disponibles
const todasLasCategorias = Object.values(Categoria);
console.log(todasLasCategorias);

// Descomenten para ver el error en acción:
//const categoriaInvalida: Categoria = 'seg';
