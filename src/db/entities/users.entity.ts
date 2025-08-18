import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bookings } from './bookings.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Bookings, (b) => b.user)
  bookings: Bookings;

  @Column({ default: 'user' })
  role: string;
}
