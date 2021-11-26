import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class FoodList {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'date' })
  public created_at: Date;

  @Column({ unique: true })
  public personal_number: number;

  @Column()
  public weight: number;

  @Column()
  public price: number;

  @Column()
  public description: string;

  @Column()
  public cover_url: string;

  @ManyToOne(() => Category, (category: Category) => category.id)
  @JoinColumn()
  public category_id: number;
}
