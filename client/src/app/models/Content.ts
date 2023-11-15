import { Account } from "./Account";

export interface Content {
    id: string;
    created: string | null;
    message: string;
    accountId: number;
    account: Account;
    contentImages: ContentImage[];
}

export interface ContentImage {
    id: number;
    imageUrl: string;
    contentId: string;
}

export interface ContentRequest {  
    Message : any;
    AccountId : any;
    FormFiles : any;
}


