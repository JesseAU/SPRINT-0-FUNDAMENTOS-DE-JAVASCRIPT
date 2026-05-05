import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mesa, MesaDocument } from './mesa.schema';

@Injectable()
export class MesasService {
  constructor(
    @InjectModel(Mesa.name) private mesaModel: Model<MesaDocument>,
  ) {}

  private transicionesValidas: Record<string, string[]> = {
    disponible: ['ocupada', 'reservada', 'fuera_de_servicio'],
    ocupada: ['disponible'],
    reservada: ['ocupada', 'disponible'],
    fuera_de_servicio: ['disponible'],
  };

  findAll(estado?: string) {
    const filtro = estado ? { estado } : {};
    return this.mesaModel.find(filtro).exec();
  }

  async findOne(id: string) {
    const mesa = await this.mesaModel.findById(id).exec();
    if (!mesa) throw new NotFoundException(`Mesa ${id} no encontrada`);
    return mesa;
  }

  create(dto: any) {
    return new this.mesaModel({ ...dto, estado: 'disponible' }).save();
  }

  async update(id: string, dto: any) {
    // update NO cambia el estado — eso lo hace cambiarEstado()
    const { estado, pedidoActivoId, ...datosPermitidos } = dto;
    const mesa = await this.mesaModel
      .findByIdAndUpdate(id, datosPermitidos, { new: true })
      .exec();
    if (!mesa) throw new NotFoundException(`Mesa ${id} no encontrada`);
    return mesa;
  }

  async cambiarEstado(id: string, nuevoEstado: string) {
    const mesa = await this.findOne(id); // lanza 404 si no existe
    const estadoActual = mesa.estado;
    const permitidas = this.transicionesValidas[estadoActual] ?? [];

    if (!permitidas.includes(nuevoEstado)) {
      throw new BadRequestException(
        `Transición "${estadoActual}" → "${nuevoEstado}" no está permitida. ` +
        `Transiciones válidas desde "${estadoActual}": ${permitidas.join(', ')}`,
      );
    }

    return this.mesaModel
      .findByIdAndUpdate(id, { estado: nuevoEstado }, { new: true })
      .exec();
  }
}
