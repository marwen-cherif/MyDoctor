import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Reminder } from './Reminder';

@Entity()
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  startAt: Date;

  @Column({ nullable: false })
  endAt: Date;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  lastModifiedAt: Date;

  @ManyToOne(() => User, (user) => user.clientAppointments, {
    nullable: false,
    cascade: true,
  })
  @JoinColumn()
  client: User;

  @ManyToOne(() => User, (user) => user.clientAppointments, {
    nullable: false,
    cascade: true,
  })
  @JoinColumn()
  doctor: User;

  @OneToMany(() => Reminder, (reminder: Reminder) => reminder.appointment)
  reminders: Promise<Reminder[]>;
}
