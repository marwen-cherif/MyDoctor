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
import { Appointment } from './Appointment';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToMany(() => Role)
  @JoinTable()
  categories: Role[];

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  clientAppointments: Promise<Appointment[]>;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  doctorAppointments: Promise<Appointment[]>;
}
