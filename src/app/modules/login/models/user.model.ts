export interface User {
    access_token: string;
    token_type: string;
    refresh_token: string;
    // role: RoleList
}

export interface LoginData {
    email: string;
    password:string
}