import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, HttpCode, Delete, UseInterceptors, UploadedFile, Res, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from 'src/entities/admin.entities';
import { CreateAdminDto, UpdateAdminDto } from 'src/dtos/admin.dto';
import { CreateJobSeekerDto, UpdateJobSeekerDto } from 'src/dtos/jobSeeker.dto';
import { CreateProviderDto } from 'src/dtos/jobProvider.dto';
import { JobSeeker } from 'src/entities/jobSeeker.entities';




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


    //create job provider through admin id
    @Post(':id/jobprovider')
    createJobProviderThroughAdminId(@Param('id', ParseIntPipe) id: number, @Body() CreateProviderDto: CreateProviderDto) {
        return this.adminService.createJobProviderThroughAdminId(id, CreateProviderDto);
    }

    //find job seeker by id
    @Get('jobseeker/:id')
    async findJobSeekerById(@Param('id', ParseIntPipe) id: number): Promise<JobSeeker> {
        return await this.adminService.findJobSeekerById(id);
    }
    //create job seeker from admin id
    @Post(':id/jobseeker')
    createJobSeekerThroughAdminId(@Param('id', ParseIntPipe) id: number, @Body() CreateJobSeekerDto: CreateJobSeekerDto) {
        return this.adminService.createJobSeekerThroughAdminId(id, CreateJobSeekerDto);
    }
    //update job seeker
    @Put('jobseeker/:id')
    async updateJobSeekerById(@Param('id', ParseIntPipe) id: number, @Body() UpdateJobSeekerDto: UpdateJobSeekerDto) {
        return await this.adminService.updateJobSeekerById(id, UpdateJobSeekerDto);
    }
    //delete job seeker
    @HttpCode(204)
    @Delete('jobseeker/:id')
    async deleteJobSeekerById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.adminService.deleteJobSeekerById(id);
    }



}