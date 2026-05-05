import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PlatosService } from './platos.service';
import { CreatePlatoDto } from './dto/create-plato.dto';

@Controller('api/platos')
export class PlatosController {
  constructor(private readonly platosService: PlatosService) {}

  @Get()
  findAll() {
    return this.platosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platosService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePlatoDto) {
    return this.platosService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.platosService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platosService.remove(id);
  }
}


