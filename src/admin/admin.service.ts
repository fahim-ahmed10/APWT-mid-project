import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/entities/admin.entities";
import { JobProvider } from "src/entities/jobProvider.entity";
import { JobSeeker } from "src/entities/jobSeeker.entities";
import { CreateAdminParams, CreateJobSeekerParams, CreateProviderParams, UpdateAdminParams, UpdateJobSeekerParams } from "src/utils/types";
import { Repository } from "typeorm";





@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        @InjectRepository(JobProvider)
        private readonly providerRepository: Repository<JobProvider>,
        @InjectRepository(JobSeeker)
        private readonly seekerRepository: Repository<JobSeeker>,

    ) { }

    //find admin
    async findAdmin() {
        const search = await this.adminRepository.find();
        if (!search)
            throw new HttpException(
                'Admin not found', HttpStatus.BAD_REQUEST);
         return this.adminRepository.find({ relations: ['jobProviders','jobSeekers'] });

    }
    //create admin
    createAdmin(adminDetails: CreateAdminParams) {
        const admin = this.adminRepository.create({
            ...adminDetails,
            createdAt: new Date()
        });
        return this.adminRepository.save(admin);
    }
    //update admin
    updateAdmin(id: number, updateAdminDetails: UpdateAdminParams) {
        return this.adminRepository.update({ id }, { ...updateAdminDetails, updatedAt: new Date() });

    }
    //delete admin
    // deleteAdmin(id: number) {
    //     return this.adminRepository.delete({ id });
    // }
    
    //create job provider through admin id
    async createJobProviderThroughAdminId(id: number, providerDetails: CreateProviderParams) {
        const admin = await this.adminRepository.findOneBy({ id });
        if (!admin)
            throw new HttpException(
                'Admin not found. Can not create job provider', HttpStatus.BAD_REQUEST);
        const newProvider = this.providerRepository.create({
            ...providerDetails,
            admin,
            createdAt: new Date()
        });
        return await this.providerRepository.save(newProvider);
    }   
    //find job seeker by id
    async findJobSeekerById(id: number) {
        const search = await this.seekerRepository.findOneBy({ id });
        if (!search)
            throw new HttpException(
                'Job seeker not found', HttpStatus.BAD_REQUEST);
        return this.seekerRepository.findOneBy({ id: id });
    }

    //create job seeker
    async createJobSeekerThroughAdminId(id: number, jobSeekerDetails: CreateJobSeekerParams) {
        const admin = await this.adminRepository.findOneBy({ id });
        if (!admin)
            throw new HttpException(
                'Admin not found. Can not create job provider', HttpStatus.BAD_REQUEST);
        const newSeeker = this.seekerRepository.create({
            ...jobSeekerDetails,
            admin,
            createdAt: new Date()
        });
        return this.seekerRepository.save(newSeeker);

    }
    
    //update job seeker    
    updateJobSeekerById(id: number, updateUserDetails: UpdateJobSeekerParams) {
        return this.seekerRepository.update({ id }, { ...updateUserDetails, updatedAt: new Date() });

    }
     //delete job seeker
     deleteJobSeekerById(id: number) {
        return this.seekerRepository.delete({ id });
    }
   

}