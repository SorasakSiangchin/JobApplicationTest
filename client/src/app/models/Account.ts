import { Content } from "./Content";

export interface Login {
    Email: string;
    Password: string;
}

export interface Register {
    Email: string;
    Password: string;
    FirstName: string,
    LastName: string,
    FormFiles: any
}

export interface Account {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token : string;
    profileImageUrl : string;
    contents : Content[]
};
