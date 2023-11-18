import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyInfo } from "src/entities/companyInfo.entities";
import { Interviwer } from "src/entities/interviwer.entities";
import { JobProvider } from "src/entities/jobProvider.entity";
import { CreateCompanyInfoParams, CreateInterviwerParams, CreateProviderParams, UpdateProviderParams} from "src/utils/types";
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
    findJobProviders() {
        return this.providerRepository.find({ relations: ['admin', 'companyInfo', 'interviwers'] });

    }
    //find job provider by id
    findJobProviderById(id: number) {
        return this.providerRepository.findOneBy({ id: id });
    }
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
    //delete company info by id
    deleteCompanyInfoById(id: number) {
        return this.companyInfoRepository.delete({ id });
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


