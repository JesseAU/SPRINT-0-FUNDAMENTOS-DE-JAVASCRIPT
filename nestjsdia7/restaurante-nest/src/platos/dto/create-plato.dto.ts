import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreatePlatoDto {
  @IsString()
  @IsNotEmpty({ message: "El nombre es requerido" })
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @Min(0.01, { message: "El precio debe ser mayor a 0" })
  precio: number;

  @IsString()
  @IsNotEmpty({ message: "La categoría es requerida" })
  categoria: string;

  @IsBoolean()
  @IsOptional()
  disponible?: boolean;
}
