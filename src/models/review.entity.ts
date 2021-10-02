import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity } from "./book.entity";
import { UserEntity } from "./user.entity";

@Entity('Review')
export class ReviewEntity {
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    comment: string

    @Column({default: 0})
    calification: number

    @ManyToOne(() => BookEntity, book => book.reviews)
    book: BookEntity;

    @ManyToOne(() => UserEntity, user => user.reviews)
    user: UserEntity;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

}