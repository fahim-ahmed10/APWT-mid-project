import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/entities/admin.entities";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { JobProvider } from "src/entities/jobProvider.entity";
import { CompanyInfo } from "src/entities/companyInfo.entities";
import { JobSeeker } from "src/entities/jobSeeker.entities";


@Module({
    imports: [TypeOrmModule.forFeature([Admin, JobProvider, CompanyInfo, JobSeeker])],
    exports: [TypeOrmModule],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule { }