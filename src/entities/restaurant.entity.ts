import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({type: 'timestamptz'})
  public created_at: Date;

  @Column()
  public name: string;
}
