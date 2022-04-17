import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { User } from './User';
import { Reminder } from './Reminder';

@Entity()
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startAt: Date;

  @Column()
  endAt: Date;

  @Column()
  createdAt: Date;

  @Column()
  lastModifiedAt: Date;

  @ManyToOne(() => User, (user) => user.clientAppointments)
  client: Promise<User>;

  @ManyToOne(() => User, (user) => user.clientAppointments)
  doctor: Promise<User>;

  @OneToMany(() => Reminder, (reminder: Reminder) => reminder.appointment)
  reminders: Promise<Reminder[]>;
}
