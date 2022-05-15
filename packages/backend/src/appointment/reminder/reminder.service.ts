import { Injectable, Logger } from '@nestjs/common';
import { Reminder, ReminderType } from './Reminder';
import { Appointment } from '../Appointment';

export interface CreateReminderProjection {
  id: string;
}

@Injectable()
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);

  async createReminder({
    date,
    reminderType,
    appointment,
  }: {
    date: Date;
    reminderType: ReminderType;
    appointment: Appointment;
  }): Promise<CreateReminderProjection> {
    const reminder = new Reminder();

    reminder.date = date;
    reminder.type = reminderType;
    reminder.appointment = appointment;

    const newReminder = await reminder.save();

    return {
      id: newReminder.id,
    };
  }
}
