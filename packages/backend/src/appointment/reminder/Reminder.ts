import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Appointment } from '../Appointment';

export enum ReminderType {
  Sms = 'Sms',
  Email = 'Email',
}

export enum ReminderStatus {
  Created = 'Created',
  Sent = 'Sent',
  Failure = 'Failure',
}

@Entity()
export class Reminder extends BaseEntity {
  constructor() {
    super();

    this.status = ReminderStatus.Created;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  type: ReminderType;

  @Column()
  status: ReminderStatus;

  @ManyToOne(
    () => Appointment,
    (appointment: Appointment) => appointment.reminders,
  )
  appointment: Appointment;
}
