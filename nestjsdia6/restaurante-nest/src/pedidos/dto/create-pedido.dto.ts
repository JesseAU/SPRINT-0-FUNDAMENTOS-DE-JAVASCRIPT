import { IsIn, IsMongoId, IsOptional } from "class-validator";

export class CreatePedidoDto {
  @IsMongoId({ message: "mesaId debe ser un ID de MongoDB válido" })
  @IsOptional()
  mesaId?: string;

  @IsIn(["mesa", "para_llevar"], { message: "tipo debe ser 'mesa' o 'para_llevar'" })
  tipo: string;
}
