import {
  Controller,
  Get,
  Query,
  Body,
  Request,
  Post,
  Logger,
} from '@nestjs/common';
import { parse, parseISO } from 'date-fns';

import { AppointmentService } from './appointment.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  private readonly logger = new Logger(AppointmentController.name);

  @Get('all')
  getAppointments(
    @Query() query: { doctorId: string; startAt?: string; endAt?: string },
  ) {
    const filters: { doctorId: string; startAt?: Date; endAt?: Date } = {
      doctorId: query.doctorId,
    };

    if (query.startAt) {
      filters.startAt = parseISO(query.startAt);
    }

    if (query.endAt) {
      filters.endAt = parseISO(query.endAt);
    }

    return this.appointmentService.getAppointments(filters);
  }

  @Post('create')
  @Roles(Role.Doctor)
  createAppointment(
    @Request() request,
    @Body()
    body: {
      startAt: string;
      endAt: string;
      clientId: string;
    },
  ) {
    const startAt = parse(body.startAt, 'yyyy-MM-dd HH:mm:ss', new Date());
    const endAt = parse(body.endAt, 'yyyy-MM-dd HH:mm:ss', new Date());

    return this.appointmentService.createAppointment({
      startAt,
      endAt,
      clientId: body.clientId,
      user: request.user,
    });
  }
}
