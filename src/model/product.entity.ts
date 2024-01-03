import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Stock } from './stock.entity';

@Entity()
export class Product extends Base {
    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', length: 200 })
    description: string;

    @OneToMany(() => Stock, (stock) => stock.product)
    stocks: Stock[];
}
