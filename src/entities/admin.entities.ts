import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'admin'})
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({nullable: true})
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;

}