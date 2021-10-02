import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuthorEntity } from "./author.entity";
import { ReviewEntity } from "./review.entity";

@Entity('Book')
export class BookEntity {
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    title: string

    @Column({default: ''})
    url: string

    @Column({unique: true})
    isbn: string

    @ManyToOne(() => AuthorEntity, author => author.books)
    author: AuthorEntity;

    @OneToMany(() => ReviewEntity, review => review.book)
    reviews: ReviewEntity[];

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

}