import { Controller, Get, Query, Body, Request, Post } from '@nestjs/common';
import { parse } from 'date-fns';

import { AppointmentService } from './appointment.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('all')
  getAppointments(@Query() query: Record<string, any>) {
    return this.appointmentService.getAppointments(
      query.doctorId,
      query.startAt,
      query.endAt,
    );
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
