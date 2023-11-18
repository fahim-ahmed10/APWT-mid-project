import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, ParseIntPipe } from '@nestjs/common';
import { JobProviderService } from './jobProvider.service';
import { CreateCompanyInfoDto } from 'src/dtos/companyInfo.dto';
import { CreateProviderDto, UpdateProviderDto } from 'src/dtos/jobProvider.dto';
import { CreateInterviwerDto } from 'src/dtos/interviwer.dto';
import { JobProvider } from 'src/entities/jobProvider.entity';




@Controller('admin/jobprovider')
export class JobProviderController {
    constructor(private jobProviderService: JobProviderService) { }



    // @Get(':type')
    // async findUsersByType(@Param('type', new ParseEnumPipe(UserType)) type: string): Promise<User[]>{
    //     const userType = type === "interviwer" ? UserType.INTERVIWER : type === "jobseeker" ? UserType.JOBSEEKER : UserType.JOBPROVIDER;
    //     return await this.userRepository.findBy({type: type});
    // }

    // @Get(':id')
    // async findUserById(@Param('id', ParseIntPipe) id: number): Promise<User>{
    //     return await this.userRepository.findOneBy({id:id});
    // }

    //find all job provider
    @Get()
    async findJobProviders() {
        return await this.jobProviderService.findJobProviders();
    }
    //find job provider by id
    @Get(':id')
    async findJobProviderById(@Param('id', ParseIntPipe) id: number): Promise<JobProvider> {
        return await this.jobProviderService.findJobProviderById(id);
    }

    //create job provider
    @Post()
    async createJobProvider(@Body() CreateProviderDto: CreateProviderDto): Promise<JobProvider> {
        return await this.jobProviderService.createJobProvider(CreateProviderDto);
    }
    //update job provider
    @Put(':id')
    async updateJobProviderById(@Param('id', ParseIntPipe) id: number, @Body() UpdateProviderDto: UpdateProviderDto) {
        return await this.jobProviderService.updateJobProviderById(id, UpdateProviderDto);
    }
    //delete job provider
    @HttpCode(204)
    @Delete('jobprovider/:id')
    async deleteJobProviderById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.jobProviderService.deleteJobProviderById(id);
    }

    //Company info creation through companyInfo entities
    @Post(':id/companyinfo')
    createCompanyInfo(@Param('id', ParseIntPipe) id: number, @Body() CreateCompanyInfoDto: CreateCompanyInfoDto) {
        return this.jobProviderService.createcompanyInfo(id, CreateCompanyInfoDto);
    }
    //delete company info
    @HttpCode(204)
    @Delete('companyinfo/:id')
    async deleteCompanyInfoById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.jobProviderService.deleteCompanyInfoById(id);
    }

    //create interviwer 
    @Post(':id/interviwer')
    createInterviwerFromProviderId(@Param('id', ParseIntPipe) id: number, @Body() CreateInterviwerDto: CreateInterviwerDto) {
        return this.jobProviderService.createInterviwerFromProviderId(id, CreateInterviwerDto);
    }
}