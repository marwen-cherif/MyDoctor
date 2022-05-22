import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Reminder, ReminderStatus, ReminderType } from './Reminder';
import { Appointment } from '../Appointment';
import { add, format } from 'date-fns';
import { NotificationService } from '../../notification/notification.service';
import { lastValueFrom, take } from 'rxjs';
import { ConfigService } from '@nestjs/config';

export interface CreateReminderProjection {
  id: string;
}

@Injectable()
export class ReminderService {
  constructor(
    private notificationService: NotificationService,
    private configService: ConfigService,
  ) {}

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

  async getReminders({
    from,
    to,
  }: {
    from?: Date;
    to?: Date;
  }): Promise<Reminder[]> {
    const builder = Reminder.createQueryBuilder('reminder');

    if (from) {
      builder.andWhere('reminder.date >= :from', { from: from.toISOString() });
    }

    if (to) {
      builder.andWhere('reminder.date <= :to', { to: to.toISOString() });
    }

    return builder
      .andWhere('reminder.status = :createdStatus', {
        createdStatus: ReminderStatus.Created,
      })
      .innerJoinAndSelect('reminder.appointment', 'appointment')
      .innerJoinAndSelect('appointment.client', 'client')
      .getMany();
  }

  @Cron(CronExpression.EVERY_10_MINUTES, {
    name: 'reminder-cron',
  })
  async triggerReminder() {
    const reminders = await this.getReminders({
      from: new Date(),
      to: add(new Date(), { minutes: 10 }),
    });

    this.logger.verbose(JSON.stringify(reminders));

    await Promise.all(
      reminders.map(async (reminder) => {
        if (reminder.type === ReminderType.Sms) {
          try {
            const sendSmsObservable = await this.notificationService.sendSms({
              from: this.configService.get('SMS_SENDER'),
              to: reminder.appointment.client.phone,
              message: `You have an appointment at ${format(
                reminder.date,
                'dd/MM/yyyy HH:mm',
              )}`,
            });

            await lastValueFrom(sendSmsObservable.pipe(take(1)));

            reminder.status = ReminderStatus.Sent;
          } catch (error) {
            this.logger.error(error);

            reminder.status = ReminderStatus.Failure;
          }

          await reminder.save();
        }

        return { failure: false };
      }),
    );
  }
}
