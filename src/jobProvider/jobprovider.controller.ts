import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, ParseIntPipe } from '@nestjs/common';
import { JobProviderService } from './jobProvider.service';
import { CreateCompanyInfoDto } from 'src/dtos/companyInfo.dto';




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
}