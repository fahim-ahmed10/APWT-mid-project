import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, HttpCode, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from 'src/entities/admin.entities';
import { CreateAdminDto, UpdateAdminDto } from 'src/dtos/admin.dto';
import { CreateJobSeekerDto } from 'src/dtos/jobSeeker.dto';
import { JobProvider } from 'src/entities/jobProvider.entity';
import { CreateProviderDto, UpdateProviderDto } from 'src/dtos/jobProvider.dto';



@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) { }

    //find admin
    @Get()
    async findAdmin() {
        return await this.adminService.findAdmin();
    }
    //create admin   
    @Post()
    async createAdmin(@Body() CreateAdminDto: CreateAdminDto): Promise<Admin> {
        return await this.adminService.createAdmin(CreateAdminDto);
    }
    //update admin
    @Patch(':id')
    async updateAdmin(@Param('id', ParseIntPipe) id: number, @Body() UpdateAdminDto: UpdateAdminDto) {
        return await this.adminService.updateAdmin(id, UpdateAdminDto);
    }
    
    //delete admin
    // @HttpCode(204)
    // @Delete(':id')
    // async deleteAdmin(@Param('id', ParseIntPipe) id: number): Promise<void> {
    //     await this.adminService.deleteAdmin(id);
    // }

    //find all job provider
    @Get('jobprovider')
    async findJobProviders() {
        return await this.adminService.findJobProviders();
    }
    //find job provider by id
    @Get('jobprovider/:id')
    async findJobProviderById(@Param('id', ParseIntPipe) id: number): Promise<JobProvider> {
        return await this.adminService.findJobProviderById(id);
    }

    //create job provider
    // @Post('jobprovider')
    // async createJobProvider(@Body() CreateProviderDto: CreateProviderDto): Promise<JobProvider> {
    //     return await this.adminService.createJobProvider(CreateProviderDto);
    // }

    //create job provider through admin id
    @Post(':id/jobprovider')
    createJobProviderThroughAdminId(@Param('id', ParseIntPipe) id: number, @Body() CreateProviderDto: CreateProviderDto) {
        return this.adminService.createJobProviderThroughAdminId(id, CreateProviderDto);
    }
    //update job provider
    @Put('jobprovider/:id')
    async updateJobProviderById(@Param('id', ParseIntPipe) id: number, @Body() UpdateProviderDto: UpdateProviderDto) {
        return await this.adminService.updateJobProviderById(id, UpdateProviderDto);
    }
    //delete job provider
    @HttpCode(204)
    @Delete('jobprovider/:id')
    async deleteJobProviderById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.adminService.deleteJobProviderById(id);
    }

    @Post(':id/jobseeker')
    createJobSeekerThroughAdminId(@Param('id', ParseIntPipe) id: number, @Body() CreateJobSeekerDto: CreateJobSeekerDto)
    {
        return this.adminService.createJobSeekerThroughAdminId(id, CreateJobSeekerDto);
    }
    //delete job seeker
    @HttpCode(204)
    @Delete('jobseeker/:id')
    async deleteJobSeekerById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.adminService.deleteJobSeekerById(id);
    }

}