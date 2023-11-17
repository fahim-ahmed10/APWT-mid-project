import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/entities/admin.entities";
import { CreateAdminParams, UpdateAdminParams } from "src/utils/types";
import { Repository } from "typeorm";





@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly userRepository: Repository<Admin>,
    ) { }

    findAdmin(){
        return this.userRepository.find();

    }

    createAdmin(adminDetails: CreateAdminParams){
        const admin = this.userRepository.create({
           ...adminDetails,
           createdAt: new Date()
       });
      return this.userRepository.save(admin);
   }
   updateAdmin(id: number, updateAdminDetails: UpdateAdminParams ){
    return this.userRepository.update({id}, {...updateAdminDetails, updatedAt: new Date()});
     
  }

}