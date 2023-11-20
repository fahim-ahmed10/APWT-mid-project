import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyInfo } from "src/entities/companyInfo.entities";
import { Interviwer } from "src/entities/interviwer.entities";
import { JobProvider } from "src/entities/jobProvider.entity";
import { CreateCompanyInfoParams, CreateInterviwerParams, CreateProviderParams, UpdateCompanyInfoParams, UpdateProviderParams } from "src/utils/types";
import { Repository } from "typeorm";



@Injectable()
export class JobProviderService {
    constructor(
        @InjectRepository(JobProvider)
        private readonly providerRepository: Repository<JobProvider>,
        @InjectRepository(CompanyInfo)
        private readonly companyInfoRepository: Repository<CompanyInfo>,
        @InjectRepository(Interviwer)
        private readonly interviwerRepository: Repository<Interviwer>,

    ) { }
    //find all jobProvider
    async findJobProviders() {
        const search = await this.providerRepository.find();
        if (!search)
            throw new HttpException(
                'Job provider not found', HttpStatus.BAD_REQUEST);
        return this.providerRepository.find({ relations: ['admin', 'companyInfo', 'interviwers'] });

    }
    //find job provider by id
    async findJobProviderById(id: number) {
        const search = await this.providerRepository.findOneBy({ id });
        if (!search)
            throw new HttpException(
                'Job provider not found', HttpStatus.BAD_REQUEST);
        return this.providerRepository.findOneBy({ id: id });
    }
    // //extract job provider username by id
    // async getUnameById(id: number, username: string) {
    //     const search = await this.providerRepository.findOneBy({id });
    //     if (!search)
    //         throw new HttpException(
    //             'Username not found', HttpStatus.BAD_REQUEST);
    //     return this.providerRepository.findBy({username: username});
    // }

    //create job provider
    createJobProvider(userDetails: CreateProviderParams) {
        const newUser = this.providerRepository.create({
            ...userDetails,
            createdAt: new Date()
        });
        return this.providerRepository.save(newUser);
    }

    //update job provider    
    updateJobProviderById(id: number, updateUserDetails: UpdateProviderParams) {
        return this.providerRepository.update({ id }, { ...updateUserDetails, updatedAt: new Date() });

    }
    //delete job provider
    deleteJobProviderById(id: number) {
        return this.providerRepository.delete({ id });
    }
    //find company info by id
    async findCompanyInfoById(id: number) {
        const search = await this.companyInfoRepository.findOneBy({ id });
        if (!search)
            throw new HttpException(
                'Company info not found', HttpStatus.BAD_REQUEST);
        return this.companyInfoRepository.findOneBy({ id: id });
    }
    //Company info creation through companyInfo entities
    async createcompanyInfo(id: number, CreateCompanyInfoParams: CreateCompanyInfoParams) {
        const provider = await this.providerRepository.findOneBy({ id });
        if (!provider)
            throw new HttpException(
                'Provider not found. Can not create Company Information', HttpStatus.BAD_REQUEST);
        const companyDetails = this.companyInfoRepository.create({
            ...CreateCompanyInfoParams,
            createdAt: new Date()
        });
        const savedCompanyDetails = await this.companyInfoRepository.save(companyDetails);
        provider.companyInfo = savedCompanyDetails;
        return this.providerRepository.save(provider);

    }
    //update company info    
    updateCompanyInfoById(id: number, updateUserDetails: UpdateCompanyInfoParams) {
        return this.companyInfoRepository.update({ id }, { ...updateUserDetails, updatedAt: new Date() });

    }
    //delete company info by id
    deleteCompanyInfoById(id: number) {
        return this.companyInfoRepository.delete({ id });
    }
    //find interviwer by id
    async findInterviwerById(id: number) {
        const search = await this.interviwerRepository.findOneBy({ id });
        if (!search)
            throw new HttpException(
                'Interviwer not found', HttpStatus.BAD_REQUEST);
        return this.interviwerRepository.findOneBy({ id: id });
    }

    //create Interviwer from provider id (provider to interviwer) one to many relationship
    async createInterviwerFromProviderId(id: number, CreateInterviwerParams: CreateInterviwerParams) {
        const jobProviders = await this.providerRepository.findOneBy({ id });
        if (!jobProviders)
            throw new HttpException(
                'Provider not found. Can not create interviwer', HttpStatus.BAD_REQUEST);
        const interviwerDetails = this.interviwerRepository.create({
            ...CreateInterviwerParams,
            jobProviders,
            createdAt: new Date()
        });
        return this.interviwerRepository.save(interviwerDetails);

    }



}


