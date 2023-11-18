;import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { JobProvider } from './jobProvider.entity';
import { JobSeeker } from './jobSeeker.entities';

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

    @OneToMany(() => JobProvider, (jobProvider) => jobProvider.admin)
    jobProviders: JobProvider[];

    @OneToMany(() => JobSeeker, (jobSeeker) => jobSeeker.admin)
    jobSeekers: JobSeeker[]; 
}