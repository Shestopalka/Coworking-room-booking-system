import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';
import { Rooms } from './rooms.entity';
@Entity()
export class Bookings {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Rooms, (r) => r.bookings)
  rooms: Rooms;

  @OneToOne(() => Users, (u) => u.bookings)
  user: Users;

  @Column()
  startTime: number;

  @Column()
  endTime: number;

  @Column()
  status: string;
}
