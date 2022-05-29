import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/User.entity';
import { Reminder } from './reminder/Reminder.entity';

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

  @Column({ nullable: false, default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  deletedAt: Date;

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

export interface AppointmentDto {
  id: string;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  lastModifiedAt?: Date;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}
