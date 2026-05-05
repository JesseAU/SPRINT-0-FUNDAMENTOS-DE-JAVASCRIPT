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
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreatePedidoDto } from "./dto/create-pedido.dto";
import { AddItemDto } from "./dto/add-item.dto";


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
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreatePedidoDto) {
    return this.pedidosService.create(dto);
  }

  @Post(":id/items")
  @UseGuards(JwtAuthGuard)
  addItem(
    @Param("id") id: string,
    @Body() dto: AddItemDto
  ) {
    return this.pedidosService.addItem(id, dto);
  }

  @Patch(":id/estado")
  @UseGuards(JwtAuthGuard)
  cambiarEstado(@Param("id") id: string, @Body() body: { estado: string }) {
    return this.pedidosService.cambiarEstado(id, body.estado);
  }
}
