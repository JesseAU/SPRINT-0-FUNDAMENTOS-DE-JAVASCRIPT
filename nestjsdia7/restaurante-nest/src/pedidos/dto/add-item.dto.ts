import { IsInt, IsMongoId, Min } from "class-validator";

export class AddItemDto {
  @IsMongoId({ message: "platoId debe ser un ID de MongoDB válido" })
  platoId: string;

  @IsInt({ message: "La cantidad debe ser un número entero" })
  @Min(1, { message: "La cantidad debe ser al menos 1" })
  cantidad: number;
}
