import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { JobProvider } from './jobProvider.entity';


@Entity({name: 'interviwers'})
export class Interviwer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    fname: string;

    @Column({ length: 100 })
    lname: string;

    @Column({unique: true})
    username: string;

    @Column({ length: 100 })
    email: string;

    @Column()
    password: string;

    @Column()
    position: string;

    @Column()
    company: string;

    @Column({nullable: true})
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;

    @ManyToOne(() => JobProvider, (jobProvider) => jobProvider.interviwers)
    jobProviders: JobProvider;
       

}