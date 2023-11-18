export type CreateProviderParams = {
    fname: string;
    lname: string;
    username: string;
    email: string;
    password: string;
}

export type UpdateProviderParams = {
    fname: string;
    lname: string;
    username: string;
    email: string;
    password: string;
}

export type CreateAdminParams ={
    username: string;
    password: string;
}
export type UpdateAdminParams ={
    password: string;
}

export type CreateCompanyInfoParams = {
    company_name: string;
    company_address: string;
    company_mail: string;
    services: string;
    website: string;
}

export type UpdateCompanyInfoParams = {
    company_address: string;
    company_mail: string;
    services: string;
}

export type CreateJobSeekerParams = {
    fname: string;
    lname: string;
    username: string;
    email: string;
    password: string;
    current_occu: string;
}