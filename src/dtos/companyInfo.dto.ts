import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCompanyInfoDto {
    @IsString()
    @IsNotEmpty()
    company_name: string;

    @IsString()
    @IsNotEmpty()
    company_address: string;

    @IsString()
    @IsNotEmpty()
    company_mail: string;

    @IsString()
    @IsNotEmpty()
    services: string;

    @IsString()
    @IsNotEmpty()
    website: string;
}

export class UpdateCompanyInfoDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    company_name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    company_address: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    company_mail: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    services: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    website: string;

}

