import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, HttpCode, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from 'src/entities/admin.entities';
import { CreateAdminDto, UpdateAdminDto } from 'src/dtos/admin.dto';
import { CreateJobSeekerDto } from 'src/dtos/jobSeeker.dto';
import { CreateProviderDto } from 'src/dtos/jobProvider.dto';



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
   
    //create job seeker from admin id
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