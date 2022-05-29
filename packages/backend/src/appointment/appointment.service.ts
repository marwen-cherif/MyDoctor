import { Injectable, Logger } from '@nestjs/common';
import { formatISO, sub } from 'date-fns';
import { AppointmentDto } from '@mydoctor/common/dto';

import { Appointment } from './Appointment.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/User.entity';
import { ReminderService } from './reminder/reminder.service';
import { ReminderType } from './reminder/Reminder.entity';
import { FailureResponse } from '../types/FailureResponse';

@Injectable()
export class AppointmentService {
  constructor(
    private userService: UserService,
    private reminderService: ReminderService,
  ) {}

  private readonly logger = new Logger(AppointmentService.name);

  async findOne(id: string): Promise<Appointment | undefined> {
    return Appointment.findOne({ where: { id } });
  }

  async getAppointments({
    doctorId,
    startAt,
    endAt,
  }: {
    doctorId: string;
    startAt?: Date;
    endAt?: Date;
  }): Promise<Appointment[] | FailureResponse> {
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
          'client.email',
        ])
        .andWhere('appointment.isDeleted = false')
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
  }): Promise<AppointmentDto> {
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
      startAt: formatISO(newAppointment.startAt),
      endAt: formatISO(newAppointment.endAt),
      createdAt: formatISO(newAppointment.createdAt),
      lastModifiedAt: formatISO(newAppointment.lastModifiedAt),
      client: {
        id: newAppointment.client.id,
        lastName: newAppointment.client.lastName,
        firstName: newAppointment.client.firstName,
        email: newAppointment.client.email,
      },
    };
  }

  async updateAppointment({
    appointment,
    startAt,
    endAt,
    clientId,
  }: {
    appointment: Appointment;
    startAt: Date;
    endAt: Date;
    clientId: string;
  }): Promise<AppointmentDto> {
    appointment.startAt = startAt;
    appointment.endAt = endAt;
    appointment.client = await this.userService.findOneById(clientId);
    appointment.lastModifiedAt = new Date();

    const newAppointment = await appointment.save();

    const reminders = await appointment.reminders;

    await Promise.all(
      (reminders || []).map((reminder) =>
        this.reminderService.deleteReminder({ id: reminder.id }),
      ),
    );

    await this.reminderService.createReminder({
      date: sub(newAppointment.startAt, { days: 1 }),
      reminderType: ReminderType.Sms,
      appointment: newAppointment,
    });

    return {
      id: newAppointment.id,
      startAt: formatISO(newAppointment.startAt),
      endAt: formatISO(newAppointment.endAt),
      createdAt: formatISO(newAppointment.createdAt),
      lastModifiedAt: formatISO(newAppointment.lastModifiedAt),
      client: {
        id: newAppointment.client.id,
        lastName: newAppointment.client.lastName,
        firstName: newAppointment.client.firstName,
        email: newAppointment.client.email,
      },
    };
  }

  async deleteAppointment({
    appointment,
  }: {
    appointment: Appointment;
  }): Promise<AppointmentDto> {
    appointment.isDeleted = true;
    appointment.deletedAt = new Date();

    await appointment.save();

    const reminders = await appointment.reminders;

    await Promise.all(
      (reminders || []).map((reminder) =>
        this.reminderService.deleteReminder({ id: reminder.id }),
      ),
    );

    return;
  }
}
