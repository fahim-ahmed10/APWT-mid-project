import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyInfo } from "src/entities/companyInfo.entities";
import { JobProvider } from "src/entities/jobProvider.entity";
import { CreateCompanyInfoParams, CreateUserParams, UpdateUserParams } from "src/utils/types";
import { Repository } from "typeorm";





@Injectable()
export class JobProviderService {
    constructor(
        @InjectRepository(JobProvider)
        private readonly providerRepository: Repository<JobProvider>,
        @InjectRepository(CompanyInfo)
        private readonly companyInfoRepository: Repository<CompanyInfo>,

    ) { }

    findUsers() {
        return this.providerRepository.find();

    }
    findUser(id: number) {
        return this.providerRepository.findOneBy({ id: id });
    }
    createUser(userDetails: CreateUserParams) {
        const newUser = this.providerRepository.create({
            ...userDetails,
            createdAt: new Date()
        });
        return this.providerRepository.save(newUser);
    }

    updateUser(id: number, updateUserDetails: UpdateUserParams) {
        return this.providerRepository.update({ id }, { ...updateUserDetails, updatedAt: new Date() });

    }

    deleteUser(id: number) {
        return this.providerRepository.delete({ id });
    }

    //Company info creation through companyInfo entities
    async createcompanyInfo(id: number, CreateCompanyDetails: CreateCompanyInfoParams){
        const provider = await this.providerRepository.findOneBy({ id });
        if (!provider)
            throw new HttpException(
                'Provider not found. Can not create Company Information', HttpStatus.BAD_REQUEST);
        const companyDetails = this.companyInfoRepository.create({
            ...CreateCompanyDetails,
            createdAt: new Date()
        });
        const savedCompanyDetails = await this.companyInfoRepository.save(companyDetails);
        provider.companyInfo = savedCompanyDetails;
        return this.providerRepository.save(provider);

    }

}


