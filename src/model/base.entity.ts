import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export class Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type: 'timestamptz',
        nullable: true,
    })
    deletedAt: Date;

    @Column({ type: 'varchar', length: 50, default: 'admin' })
    createdBy: string;

    @Column({ type: 'varchar', length: 50, default: 'admin' })
    updatedBy: string;

    @Column({ type: 'varchar', length: 50, default: 'admin' })
    deletedBy: string;

    @Column({ type: 'boolean', default: true })
    _isActive: boolean;
}
