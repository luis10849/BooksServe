import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {BookEntity} from "./book.entity";
import { ReviewEntity } from "./review.entity";

@Entity('User')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => BookEntity, book => book.author)
    books: BookEntity[];

    @OneToMany(() => ReviewEntity, review => review.user)
    reviews: ReviewEntity[];
}