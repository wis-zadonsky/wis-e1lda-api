import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { JoinColumn } from 'typeorm/browser';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'timestamptz' })
  public created_at: Date;

  @Column()
  public name: string;

  @OneToMany(() => Restaurant, (restaurant: Restaurant) => restaurant.id)
  @JoinColumn()
  public restaurant_id: number;
}
