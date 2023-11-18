import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/entities/admin.entities";
import { JobProvider } from "src/entities/jobProvider.entity";
import { JobSeeker } from "src/entities/jobSeeker.entities";
import { CreateAdminParams, CreateJobSeekerParams, CreateProviderParams, UpdateAdminParams, UpdateProviderParams } from "src/utils/types";
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
    findAdmin() {
        return this.adminRepository.find({ relations: ['jobProviders', 'jobSeekers'] });

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
    //find all jobProvider
    findJobProviders() {
        return this.providerRepository.find({ relations: ['admin', 'companyInfo'] });

    }
    //find job provider by id
    findJobProviderById(id: number) {
        return this.providerRepository.findOneBy({ id: id });
    }
    //create job provider
    // createJobProvider(userDetails: CreateUserParams) {
    //     const newUser = this.providerRepository.create({
    //         ...userDetails,
    //         createdAt: new Date()
    //     });
    //     return this.providerRepository.save(newUser);
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
    //update job provider    
    updateJobProviderById(id: number, updateUserDetails: UpdateProviderParams) {
        return this.providerRepository.update({ id }, { ...updateUserDetails, updatedAt: new Date() });

    }
    //delete job provider
    deleteJobProviderById(id: number) {
        return this.providerRepository.delete({ id });
    }


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
    //delete job seeker
    deleteJobSeekerById(id: number) {
        return this.seekerRepository.delete({ id });
    }

}