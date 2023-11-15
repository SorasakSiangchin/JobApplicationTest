import { Account } from "./Account";

export interface Comment {
    id: number;
    message: string;
    accountId: number;
    contentId: string;
    account: Account;
}

export interface CommentRequest {
    Message: string;
    AccountId: any;
    ContentId: string;
}
