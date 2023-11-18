import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Admin } from './admin.entities';


@Entity({name: 'jobseekers'})
export class JobSeeker {
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
    current_occu: string;

    @Column({nullable: true})
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;

    @ManyToOne(() => Admin, (admin) => admin.jobSeekers)
    admin: Admin;
    

}