import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MesasService } from './mesas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { CambiarEstadoMesaDto } from './dto/cambiar-estado.dto';

@Controller('api/mesas')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

  @Get()
  findAll(@Query('estado') estado?: string) {
    return this.mesasService.findAll(estado);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mesasService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMesaDto) {
    return this.mesasService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.mesasService.update(id, body);
  }

  @Patch(':id/estado')
  @UseGuards(JwtAuthGuard)
  cambiarEstado(
    @Param('id') id: string,
    @Body() dto: CambiarEstadoMesaDto,
  ) {
    return this.mesasService.cambiarEstado(id, dto.estado);
  }
}
