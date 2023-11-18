import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { CompanyInfo } from './companyInfo.entities';
import { Admin } from './admin.entities';

@Entity({name: 'jobproviders'})
export class JobProvider {
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
    work_position: string;

    @Column({nullable: true})
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;

    @ManyToOne(() => Admin, (admin) => admin.jobProviders)
    admin: Admin;
    
    @JoinColumn()
    @OneToOne(() => CompanyInfo)
    companyInfo: CompanyInfo;

    

}