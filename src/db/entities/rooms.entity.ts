import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bookings } from './bookings.entity';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cpacity: string;

  @Column()
  location: string;

  @OneToOne(() => Bookings, (b) => b.rooms)
  bookings: Bookings;

  @Column()
  amenities: string;
}
