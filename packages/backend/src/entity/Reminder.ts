import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Appointment } from './Appointment';

export enum ReminderType {
  Sms = 'Sms',
  Email = 'Email',
}

@Entity()
export class Reminder extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  type: ReminderType;

  @ManyToOne(
    () => Appointment,
    (appointment: Appointment) => appointment.reminders,
  )
  appointment: Promise<Appointment>;
}
