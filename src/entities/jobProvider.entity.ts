import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CompanyInfo } from './companyInfo.entities';
import { Admin } from './admin.entities';
import { Interviwer } from './interviwer.entities';

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
    
    @OneToMany(() => Interviwer, (interviwer) => interviwer.jobProviders)
    interviwers: Interviwer[];

    @JoinColumn()
    @OneToOne(() => CompanyInfo)
    companyInfo: CompanyInfo;

    

}