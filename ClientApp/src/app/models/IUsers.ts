export interface IUser {
    displayname: string;
    username: string;
    token: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IRegisterUser {
    email: string;
    displayname: string;
    username: string;
    passwrod: string;
}