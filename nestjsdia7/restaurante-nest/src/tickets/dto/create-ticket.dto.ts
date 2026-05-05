import { IsIn, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateTicketDto {
  @IsMongoId({ message: "pedidoId debe ser un ID de MongoDB válido" })
  @IsNotEmpty({ message: "pedidoId es requerido" })
  pedidoId: string;

  @IsString()
  @IsNotEmpty({ message: "metodoPago es requerido" })
  @IsIn(["efectivo", "tarjeta", "yape"], { message: "metodoPago debe ser efectivo, tarjeta o yape" })
  metodoPago: string;
}
