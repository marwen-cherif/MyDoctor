import { Injectable, Logger } from '@nestjs/common';
import { sub } from 'date-fns';

import { Appointment, AppointmentDto } from './Appointment.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/User.entity';
import { ReminderService } from './reminder/reminder.service';
import { ReminderType } from './reminder/Reminder.entity';
import { FailureResponse } from '../types/FailureResponse';

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
  constructor(
    private userService: UserService,
    private reminderService: ReminderService,
  ) {}

  private readonly logger = new Logger(AppointmentService.name);

  async getAppointments({
    doctorId,
    startAt,
    endAt,
  }: {
    doctorId: string;
    startAt?: Date;
    endAt?: Date;
  }): Promise<AppointmentDto[] | FailureResponse> {
    const builder = Appointment.createQueryBuilder('appointment').where(
      'appointment.doctorId = :doctorId',
      { doctorId },
    );

    if (startAt) {
      builder.andWhere('appointment.startAt >= :startAt', {
        startAt: startAt.toISOString(),
      });
    }

    if (endAt) {
      builder.andWhere('appointment.endAt < :endAt', {
        endAt: endAt.toISOString(),
      });
    }

    try {
      const result = await builder
        .leftJoinAndSelect('appointment.client', 'client')
        .select([
          'appointment',
          'client.id',
          'client.firstName',
          'client.lastName',
        ])
        .getMany();

      return result;
    } catch (error) {
      return {
        type: 'LoadFailure',
        reason: error.message,
      };
    }
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

    await this.reminderService.createReminder({
      date: sub(newAppointment.startAt, { days: 1 }),
      reminderType: ReminderType.Sms,
      appointment: newAppointment,
    });

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
