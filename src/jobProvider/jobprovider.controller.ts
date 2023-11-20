import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { JobProviderService } from './jobProvider.service';
import { CreateCompanyInfoDto, UpdateCompanyInfoDto } from 'src/dtos/companyInfo.dto';
import { CreateProviderDto, UpdateProviderDto } from 'src/dtos/jobProvider.dto';
import { CreateInterviwerDto } from 'src/dtos/interviwer.dto';
import { JobProvider } from 'src/entities/jobProvider.entity';
import { CompanyInfo } from 'src/entities/companyInfo.entities';
import { Interviwer } from 'src/entities/interviwer.entities';





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
    // //extract username through query params
    // @Get('username/:id')
    // async getUnameById(@Param('id', ParseIntPipe) id: number, @Query('id') query: string){
    //     return await this.jobProviderService.getUnameById(id, query);
    // }

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
    @Delete(':id')
    async deleteJobProviderById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.jobProviderService.deleteJobProviderById(id);
    }

    //find company info by id
    @Get('companyinfo/:id')
    async findCompanyInfoById(@Param('id', ParseIntPipe) id: number): Promise<CompanyInfo> {
        return await this.jobProviderService.findCompanyInfoById(id);
    }

    //Company info creation through companyInfo entities
    @Post(':id/companyinfo')
    createCompanyInfo(@Param('id', ParseIntPipe) id: number, @Body() CreateCompanyInfoDto: CreateCompanyInfoDto) {
        return this.jobProviderService.createcompanyInfo(id, CreateCompanyInfoDto);
    }
    //update company info
    @Patch('companyinfo/:id')
    async updateCompanyInfoById(@Param('id', ParseIntPipe) id: number, @Body() UpdateCompanyInfoDto: UpdateCompanyInfoDto){
        return await this.jobProviderService.updateCompanyInfoById(id, UpdateCompanyInfoDto);
    }
    //delete company info
    @HttpCode(204)
    @Delete('companyinfo/:id')
    async deleteCompanyInfoById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.jobProviderService.deleteCompanyInfoById(id);
    }

     //find interviwer id
     @Get('interviwer/:id')
     async findInterviwerById(@Param('id', ParseIntPipe) id: number): Promise<Interviwer> {
         return await this.jobProviderService.findInterviwerById(id);
     }
    //create interviwer 
    @Post(':id/interviwer')
    createInterviwerFromProviderId(@Param('id', ParseIntPipe) id: number, @Body() CreateInterviwerDto: CreateInterviwerDto) {
        return this.jobProviderService.createInterviwerFromProviderId(id, CreateInterviwerDto);
    }
}