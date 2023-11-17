import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, ParseIntPipe } from '@nestjs/common';
import { JobProvider } from '../entities/jobProvider.entity';
import { CreateProviderDto, UpdateProviderDto } from 'src/dtos/jobProvider.dto';
import { JobProviderService } from './jobProvider.service';
import { CreateCompanyInfoDto } from 'src/dtos/companyInfo.dto';




@Controller('jobprovider')
export class JobProviderController {
    constructor(private jobProviderService: JobProviderService) { }

    @Get()
    async findUsers() {
        return await this.jobProviderService.findUsers();
    }

    // @Get(':type')
    // async findUsersByType(@Param('type', new ParseEnumPipe(UserType)) type: string): Promise<User[]>{
    //     const userType = type === "interviwer" ? UserType.INTERVIWER : type === "jobseeker" ? UserType.JOBSEEKER : UserType.JOBPROVIDER;
    //     return await this.userRepository.findBy({type: type});
    // }

    // @Get(':id')
    // async findUserById(@Param('id', ParseIntPipe) id: number): Promise<User>{
    //     return await this.userRepository.findOneBy({id:id});
    // }

    @Get(':id')
    async findUserById(@Param('id', ParseIntPipe) id: number): Promise<JobProvider> {
        return await this.jobProviderService.findUser(id);
    } 

    @Post()
    async createUser(@Body() CreateProviderDto: CreateProviderDto): Promise<JobProvider> {
        return await this.jobProviderService.createUser(CreateProviderDto);
    }

    @Put(':id')
    async updateUserById(@Param('id', ParseIntPipe) id: number, @Body() UpdateProviderDto: UpdateProviderDto){
        await this.jobProviderService.updateUser(id, UpdateProviderDto);
    }

    @HttpCode(204)
    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<void> {
         await this.jobProviderService.deleteUser(id);
    }

    //Company info creation through companyInfo entities
    @Post(':id/companyinfo')
    createCompanyInfo(@Param('id', ParseIntPipe) id: number, @Body() CreateCompanyInfoDto: CreateCompanyInfoDto) {
       return this.jobProviderService.createcompanyInfo(id, CreateCompanyInfoDto);
    }
}