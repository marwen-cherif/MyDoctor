import {
  Controller,
  Get,
  Query,
  Body,
  Request,
  Post,
  Logger,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { parseISO } from 'date-fns';
import { FailureResponse } from '@mydoctor/common/types';
import { AppointmentDto, CreateAppointmentPayload } from '@mydoctor/common/dto';

import { AppointmentService } from './appointment.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enums/role.enum';
import { UserService } from '../user/user.service';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly userService: UserService,
  ) {}

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
  async createAppointment(
    @Request() request,
    @Body()
    body: CreateAppointmentPayload,
  ): Promise<AppointmentDto | FailureResponse> {
    const startAt = parseISO(body.startAt);
    const endAt = parseISO(body.endAt);

    const client = await this.userService.findOneById(body.clientId);

    if (!client) {
      return {
        type: 'NotFound',
        reason: 'Client not found',
      };
    }

    return this.appointmentService.createAppointment({
      startAt,
      endAt,
      clientId: client.id,
      user: request.user,
    });
  }

  @Put('')
  @Roles(Role.Doctor)
  async updateAppointment(
    @Request() request,
    @Body()
    body: {
      id: string;
      startAt: string;
      endAt: string;
    },
  ): Promise<AppointmentDto | FailureResponse> {
    const startAt = parseISO(body.startAt);
    const endAt = parseISO(body.endAt);

    const appointment = await this.appointmentService.findOne(body.id);

    return this.appointmentService.updateAppointment({
      appointment,
      startAt,
      endAt,
    });
  }

  @Delete(':id')
  @Roles(Role.Doctor)
  async deleteAppointment(
    @Param('id') id: string,
  ): Promise<AppointmentDto | FailureResponse> {
    this.logger.verbose('deleteAppointment');

    const appointment = await this.appointmentService.findOne(id);

    return this.appointmentService.deleteAppointment({
      appointment,
    });
  }
}
