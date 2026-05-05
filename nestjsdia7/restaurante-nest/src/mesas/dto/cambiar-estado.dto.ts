import { IsIn, IsString } from "class-validator";

export class CambiarEstadoMesaDto {
  @IsString()
  @IsIn(["disponible", "ocupada", "reservada", "fuera_de_servicio"], {
    message: "Estado no válido",
  })
  estado: string;
}
