import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {BookEntity} from "./book.entity";

@Entity('Author')
export class AuthorEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => BookEntity, book => book.author)
    books: BookEntity[];

}