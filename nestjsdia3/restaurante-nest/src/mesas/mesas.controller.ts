import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MesasService } from './mesas.service';

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
  create(@Body() body: any) {
    return this.mesasService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.mesasService.update(id, body);
  }

  @Patch(':id/estado')
  cambiarEstado(
    @Param('id') id: string,
    @Body() body: { estado: string },
  ) {
    return this.mesasService.cambiarEstado(id, body.estado);
  }
}
