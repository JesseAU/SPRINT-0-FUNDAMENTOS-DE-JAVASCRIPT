import { z } from 'zod'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config()
 
// Schema — cada variable con su validación
const envSchema = z.object({
  PORT:       z.string().default('3000'),
  MONGO_URI:  z.string().min(1, {
    message: 'MONGO_URI es requerida — agreguen mongodb://... al .env'
  }),
  JWT_SECRET: z.string().min(8, {
    message: 'JWT_SECRET debe tener al menos 8 caracteres'
  }),
})
 
// parse() lanza ZodError si algo está mal — la app no arranca
const env = envSchema.parse(process.env)
 
// config exporta valores con tipos correctos — nunca undefined
export const config = {
  port:      Number(env.PORT),   // string → number
  mongoUri:  env.MONGO_URI,       // string garantizado
  jwtSecret: env.JWT_SECRET,      // string garantizado
} as const  // as const hace los valores readonly
