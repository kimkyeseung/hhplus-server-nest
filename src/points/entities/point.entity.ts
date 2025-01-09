import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  balance: number;

  @OneToOne(() => User, (user) => user.id)
  user: User;
}
