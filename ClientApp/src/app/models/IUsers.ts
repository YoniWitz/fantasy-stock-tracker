export interface IUser {
    displayName: string;
    userName: string;
    token: string;
    password?:string;
    message?:string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IRegisterUser {
    email: string;
    displayName: string;
    userName: string;
    password: string;
}