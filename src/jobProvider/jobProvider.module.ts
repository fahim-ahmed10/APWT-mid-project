import { Module } from "@nestjs/common";
import { JobProviderController } from "./jobprovider.controller";
import { JobProviderService } from "./jobProvider.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobProvider } from "src/entities/jobProvider.entity";
import { CompanyInfo } from "src/entities/companyInfo.entities";
import { Interviwer } from "src/entities/interviwer.entities";

@Module({
    imports: [TypeOrmModule.forFeature([JobProvider, CompanyInfo, Interviwer])],
    exports: [TypeOrmModule],
    controllers: [JobProviderController],
    providers: [JobProviderService],
})
export class JobProviderModule { }