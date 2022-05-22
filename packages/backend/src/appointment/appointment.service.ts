import { Injectable, Logger } from '@nestjs/common';
import { Appointment } from './Appointment.entity';

import { UserService } from '../user/user.service';
import { User } from '../user/User.entity';
import { ReminderService } from './reminder/reminder.service';
import { ReminderType } from './reminder/Reminder.entity';
import { sub } from 'date-fns';

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
  }): Promise<Appointment[] | undefined> {
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

    return await builder.getMany();
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
