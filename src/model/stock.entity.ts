import { Base } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Stock extends Base {
    @Column({ type: 'integer', default: 0 })
    quantity: number;

    @Column({ type: 'integer', default: 0 })
    price: number;

    @ManyToOne(() => Product, (product) => product.stocks)
    product: Product;
}
