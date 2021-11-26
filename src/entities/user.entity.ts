import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'timestamptz' })
  public created_at: Date;

  @Column()
  public first_name: string;

  @Column()
  public last_name: string;

  @Column()
  public tg_id: number;

  @Column({ default: false })
  public is_deactivated: boolean;

  @Column()
  public is_admin: boolean;

  @Column({ type: 'date' })
  public birth_date: Date;
}
