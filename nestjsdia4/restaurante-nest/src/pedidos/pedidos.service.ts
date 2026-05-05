import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Pedido, PedidoDocument } from "./pedido.schema";
import { MesasService } from "../mesas/mesas.service";
import { PlatosService } from "../platos/platos.service";

@Injectable()
export class PedidosService {
  constructor(
    @InjectModel(Pedido.name) private pedidoModel: Model<PedidoDocument>,
    private readonly mesasService: MesasService,
    private readonly platosService: PlatosService
  ) {}

  private transicionesValidas: Record<string, string[]> = {
    pendiente: ["en_preparacion", "cancelada"],
    en_preparacion: ["lista", "cancelada"],
    lista: ["entregada", "cancelada"],
    entregada: [], // solo el Ticket puede cerrar (Día 7)
    cancelada: [],
    cerrada: [],
  };

  async create(dto: { mesaId?: string; tipo: string }) {
    const pedido = await new this.pedidoModel({
      mesaId: dto.mesaId ?? null,
      tipo: dto.tipo,
      items: [],
      total: 0,
    }).save();

    if (dto.mesaId) {
      await this.mesasService.cambiarEstado(dto.mesaId, "ocupada");
      await this.mesasService.update(dto.mesaId, {
        pedidoActivoId: pedido._id.toString(),
      });
    }
    return pedido;
  }

  async addItem(pedidoId: string, dto: { platoId: string; cantidad: number }) {
    const pedido = await this.pedidoModel.findById(pedidoId).exec();
    if (!pedido) throw new NotFoundException(`Pedido ${pedidoId} no encontrado`);
    if (pedido.estado !== "pendiente")
      throw new BadRequestException(
        "Solo se pueden agregar items a pedidos pendientes"
      );

    const plato = await this.platosService.findOne(dto.platoId);

    pedido.items.push({
      platoId: dto.platoId,
      nombre: plato.nombre, // snapshot
      cantidad: dto.cantidad,
      precioUnitario: plato.precio, // snapshot
    } as any);

    pedido.total = pedido.items.reduce(
      (sum, item) => sum + item.cantidad * item.precioUnitario,
      0
    );

    pedido.markModified("items");
    return pedido.save();
  }

  async cambiarEstado(id: string, nuevoEstado: string) {
    const pedido = await this.findOne(id);
    const permitidas = this.transicionesValidas[pedido.estado] ?? [];
    if (!permitidas.includes(nuevoEstado))
      throw new BadRequestException(
        `Transición "${pedido.estado}" → "${nuevoEstado}" no permitida`
      );
    return this.pedidoModel
      .findByIdAndUpdate(id, { estado: nuevoEstado }, { new: true })
      .exec();
  }

  findAll(estado?: string) {
    const filtro = estado ? { estado } : {};
    return this.pedidoModel.find(filtro).exec();
  }

  async findOne(id: string) {
    const pedido = await this.pedidoModel.findById(id).exec();
    if (!pedido) throw new NotFoundException(`Pedido ${id} no encontrado`);
    return pedido;
  }
}
