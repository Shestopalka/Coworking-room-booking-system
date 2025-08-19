import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Rooms } from './rooms.entity';
@Entity()
export class Bookings {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Rooms, (r) => r.bookings)
  @JoinColumn({ name: 'roomId' })
  rooms: Rooms;

  @ManyToOne(() => Users, (u) => u.bookings)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column({ type: 'timestamptz' })
  endTime: Date;

  @Column({ default: 'panding' })
  status: string;
}
