import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'companyinfo'})
export class CompanyInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    company_name: string;

    @Column({ length: 100 })
    company_address: string;

    @Column({unique: true})
    company_mail: string;

    @Column({ length: 50 })
    services: string;

    @Column({unique: true})
    website: string;

    @Column({nullable: true})
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;

}