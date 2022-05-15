import { Injectable, Logger } from '@nestjs/common';
import { Appointment } from '../entity/Appointment';

import { UserService } from '../user/user.service';
import { User } from '../entity/User';

export interface CreateAppointmentProjection {
  id: string;
  client: {
    id: string;
    email: string;
    phone: string;
  };
  doctor: {
    id: string;
    email: string;
    phone: string;
  };
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  lastModifiedAt: Date;
}

@Injectable()
export class AppointmentService {
  constructor(private userService: UserService) {}

  private readonly logger = new Logger(AppointmentService.name);

  async getAppointments(
    doctorId: string,
    startAt?: Date,
    endAt?: Date,
  ): Promise<Appointment[] | undefined> {
    const builder = Appointment.createQueryBuilder()
      .select()
      .andWhere('appointment.doctorId = :doctorId', { doctorId });

    if (startAt) {
      builder.andWhere('appointment.startAt >= :startAt', {
        startAt: startAt,
      });
    }

    if (endAt) {
      builder.andWhere('appointment.endAt <= :endAt', {
        endAt: endAt,
      });
    }

    return builder.getMany();
  }

  async createAppointment({
    startAt,
    endAt,
    clientId,
    user,
  }: {
    startAt: Date;
    endAt: Date;
    clientId: string;
    user: User;
  }): Promise<CreateAppointmentProjection> {
    const appointment = new Appointment();
    appointment.startAt = startAt;
    appointment.endAt = endAt;
    appointment.doctor = await this.userService.findOneById(user.id);
    appointment.client = await this.userService.findOneById(clientId);
    appointment.createdAt = new Date();

    const newAppointment = await appointment.save();

    return {
      id: newAppointment.id,
      startAt: newAppointment.startAt,
      endAt: newAppointment.endAt,
      createdAt: newAppointment.createdAt,
      lastModifiedAt: newAppointment.lastModifiedAt,
      doctor: {
        id: newAppointment.doctor.id,
        email: newAppointment.doctor.email,
        phone: newAppointment.doctor.phone,
      },
      client: {
        id: newAppointment.client.id,
        email: newAppointment.client.email,
        phone: newAppointment.client.phone,
      },
    };
  }
}
