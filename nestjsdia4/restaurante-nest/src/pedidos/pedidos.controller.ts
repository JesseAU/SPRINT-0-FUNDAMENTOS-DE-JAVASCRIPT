import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { PedidosService } from "./pedidos.service";

@Controller("api/pedidos")
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Get()
  findAll(@Query("estado") estado?: string) {
    return this.pedidosService.findAll(estado);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.pedidosService.findOne(id);
  }

  @Post()
  create(@Body() body: { mesaId?: string; tipo: string }) {
    return this.pedidosService.create(body);
  }

  @Post(":id/items")
  addItem(
    @Param("id") id: string,
    @Body() body: { platoId: string; cantidad: number }
  ) {
    return this.pedidosService.addItem(id, body);
  }

  @Patch(":id/estado")
  cambiarEstado(@Param("id") id: string, @Body() body: { estado: string }) {
    return this.pedidosService.cambiarEstado(id, body.estado);
  }
}
