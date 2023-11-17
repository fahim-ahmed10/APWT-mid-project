import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsOptional} from "class-validator";

export class CreateProviderDto{
    @IsString()
    @IsNotEmpty()
    fname: string;

    @IsString()
    @IsNotEmpty()
    lname: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    //@IsStrongPassword()
    password: string; 
}

export class UpdateProviderDto{
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    fname: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    lname: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsNotEmpty()
    //@IsStrongPassword()
    password: string;

}

