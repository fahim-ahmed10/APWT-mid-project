import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from 'src/entities/admin.entities';
import { CreateAdminDto, UpdateAdminDto } from 'src/dtos/admin.dto';



@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) { }

    @Get()
    async findAdmin() {
        return await this.adminService.findAdmin();
    }
    
    @Post()
    async createAdmin(@Body() CreateAdminDto: CreateAdminDto): Promise<Admin> {
        return await this.adminService.createAdmin(CreateAdminDto);
    }
    
    @Patch(':id')
    async updateAdmin(@Param('id', ParseIntPipe) id: number, @Body() UpdateAdminDto: UpdateAdminDto) {
        await this.adminService.updateAdmin(id, UpdateAdminDto);
    }

}