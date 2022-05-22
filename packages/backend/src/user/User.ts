import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Role } from './Role';
import { Appointment } from '../appointment/Appointment';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  lastModifiedAt: Date;

  @Column({ unique: true })
  phone: string;

  @ManyToMany(() => Role, { eager: true })
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  clientAppointments: Promise<Appointment[]>;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  doctorAppointments: Promise<Appointment[]>;
}