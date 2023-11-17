import {IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsOptional} from "class-validator";

export class CreateAdminDto{
    @IsString()
    @IsNotEmpty()
    username: string; 

    @IsNotEmpty()
    //@IsStrongPassword()
    password: string;
    
}

export class UpdateAdminDto{
    @IsNotEmpty()
    password: string;
}

