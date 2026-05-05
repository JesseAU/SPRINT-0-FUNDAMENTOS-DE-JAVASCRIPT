import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateTicketDto } from "./dto/create-ticket.dto";

@Controller("api/tickets")
@UseGuards(JwtAuthGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() dto: CreateTicketDto) {
    return this.ticketsService.create(dto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ticketsService.findOne(id);
  }
}
