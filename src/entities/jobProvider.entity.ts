import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { CompanyInfo } from './companyInfo.entities';

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

    @Column({nullable: true})
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;

    @OneToOne(() => CompanyInfo)
    @JoinColumn()
    companyInfo: CompanyInfo;

}