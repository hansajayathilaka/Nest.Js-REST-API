import { Base } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends Base {
    @Column({ type: 'varchar', length: 50 })
    fName: string;

    @Column({ type: 'varchar', length: 50 })
    lName: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 600, select: false })
    passwordHash: string;

    @Column({ type: 'timestamptz' })
    dateOfBirth: Date;
}
