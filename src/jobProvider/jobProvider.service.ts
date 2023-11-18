import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyInfo } from "src/entities/companyInfo.entities";
import { JobProvider } from "src/entities/jobProvider.entity";
import { CreateCompanyInfoParams } from "src/utils/types";
import { Repository } from "typeorm";



@Injectable()
export class JobProviderService {
    constructor(
        @InjectRepository(JobProvider)
        private readonly providerRepository: Repository<JobProvider>,
        @InjectRepository(CompanyInfo)
        private readonly companyInfoRepository: Repository<CompanyInfo>,

    ) { }


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
    //delete company info
    deleteCompanyInfoById(id: number) {
        return this.companyInfoRepository.delete({ id });
    }

}


