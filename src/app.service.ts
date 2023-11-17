import { Injectable } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import {UserType, adminData} from './data';


interface CreateUser{
    name: string;
    email: string;
    password: string;
}

interface UpdateUser{
    email: string;
    password: string;
}


@Injectable()
export class AppService{
    
    getAllUsers(){
        return adminData.users;
    }
    getUser(type: UserType){
        return adminData.users.filter((users) => users.type === type);
    }
    getUserById(type: UserType, id: string){
        return adminData.users
        .filter((users) => users.type === type)
        .find((users) => users.id === id);
    }
    getUserByQuery(type: UserType){
        return adminData.users.filter((users) => users.type === type);
    }

    createUser( {name, email, password} : CreateUser, type: UserType){
        const newUser = {
            id: uuid(),
            name,
            email,
            password, 
            type, 
            created_at: new Date(),
            updated_at: new Date(),                  
      
          };
          adminData.users.push(newUser)
          return newUser;
    }   
    updateUser(type: UserType, id: string, body: UpdateUser){
        const userType = type === "interviwer" ? UserType.INTERVIWER : type === "jobseeker" ? UserType.JOBSEEKER : UserType.JOBPROVIDER;

        const userToUpdate =  adminData.users
        .filter((users) => users.type === type)
        .find((users) => users.id === id);

        if (!userToUpdate) return;

        const userIndex = adminData.users.findIndex((users) => users.id === userToUpdate.id);

        adminData.users[userIndex] = {
          ...adminData.users[userIndex],
          ...body,
          updated_at: new Date()
    
        }
        return adminData.users[userIndex];
    }

    deleteUser(id: string){
        const userIndex = adminData.users.findIndex((users) => users.id === id);

        if (userIndex === -1) return;
    
        adminData.users.splice(userIndex, 1)
        return;
    }

    
}


