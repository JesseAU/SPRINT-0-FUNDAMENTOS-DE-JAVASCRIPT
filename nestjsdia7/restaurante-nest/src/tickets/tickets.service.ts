import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ticket, TicketDocument } from "./ticket.schema";
import { PedidosService } from "../pedidos/pedidos.service";
import { MesasService } from "../mesas/mesas.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    private readonly pedidosService: PedidosService,
    private readonly mesasService: MesasService,
  ) {}

  async create(dto: CreateTicketDto) {
    const pedido = await this.pedidosService.findOne(dto.pedidoId);
    
    if (pedido.estado !== "entregada") {
      throw new BadRequestException("El pedido debe estar en estado entregada para generar ticket");
    }

    const itemsSnapshot = pedido.items.map(i => ({
      nombre: i.nombre,
      cantidad: i.cantidad,
      precioUnitario: i.precioUnitario,
    }));

    const total = itemsSnapshot.reduce((acc, item) => acc + (item.cantidad * item.precioUnitario), 0);

    const ticket = await new this.ticketModel({
      pedidoId: dto.pedidoId,
      mesaId: pedido.mesaId ?? null,
      items: itemsSnapshot,
      subtotal: total,
      total,
      metodoPago: dto.metodoPago,
    }).save();

    // 1. Cerrar pedido
    await this.pedidosService.cambiarEstado(dto.pedidoId, "cerrada");

    // 2. Liberar mesa si aplica
    if (pedido.mesaId) {
      await this.mesasService.cambiarEstado(pedido.mesaId, "disponible");
      await this.mesasService.update(pedido.mesaId, { pedidoActivoId: null });
    }

    return ticket;
  }

  async findOne(id: string) {
    const ticket = await this.ticketModel.findById(id);
    if (!ticket) throw new NotFoundException(`Ticket ${id} no encontrado`);
    return ticket;
  }
}
