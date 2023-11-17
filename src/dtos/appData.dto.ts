import {IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsOptional} from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    //@IsStrongPassword()
    password: string;
    
}

export class UpdateUserDto{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

