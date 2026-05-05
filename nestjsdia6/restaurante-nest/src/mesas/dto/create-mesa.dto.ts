import { IsInt, Min } from "class-validator";

export class CreateMesaDto {
  @IsInt({ message: "El número de mesa debe ser un entero" })
  @Min(1, { message: "El número de mesa debe ser al menos 1" })
  numero: number;

  @IsInt({ message: "La capacidad debe ser un entero" })
  @Min(1, { message: "La capacidad debe ser al menos 1" })
  capacidad: number;
}
