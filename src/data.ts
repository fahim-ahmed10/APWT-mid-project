export enum UserType {
    INTERVIWER = "interviwer",
    JOBSEEKER = "jobseeker",
    JOBPROVIDER = "jobprovider"
}
export const adminData: Data = {
    users: [
        {
            id: "uuid1",
            name: "Mohammad",
            email: "mohammad@gmail.com",
            password: "123",
            type: UserType.INTERVIWER,
            created_at: new Date(),
            updated_at: new Date(),
            

        },
        {
            id: "uuid2",
            name: "Rahman",
            email: "rahman@gmail.com",
            password: "123sdsfa32",
            type: UserType.INTERVIWER,
            created_at: new Date(),
            updated_at: new Date(),
            
        },
        {
            id: "uuid1",
            name: "Ali",
            email: "ali@gmail.com",
            password: "1234",
            type: UserType.JOBSEEKER,
            created_at: new Date(),
            updated_at: new Date(),
            
        },
        {
            id: "uuid2",
            name: "Ridika",
            email: "ridika@gmail.com",
            password: "12s3",
            type: UserType.JOBSEEKER,
            created_at: new Date(),
            updated_at: new Date(),
            
        },
        {
            id: "uuid3",
            name: "Ramim",
            email: "ramim123@gmail.com",
            password: "123ads",
            type: UserType.JOBSEEKER,
            created_at: new Date(),
            updated_at: new Date(),
            
        },
        {
            id: "uuid1",
            name: "Rima",
            email: "rima@gmail.com",
            password: "1234",
            type: UserType.JOBPROVIDER,
            created_at: new Date(),
            updated_at: new Date(),
            
        },
        {
            id: "uuid2",
            name: "Saad",
            email: "saad@gmail.com",
            password: "1236",
            type: UserType.JOBPROVIDER,
            created_at: new Date(),
            updated_at: new Date(),
            
        },

    ],
};

export interface Data {
    users: {
        id: string,
        name: string,
        email: string,
        password: string,
        type: UserType,
        created_at: Date,
        updated_at: Date,
        

    }[],
}
        