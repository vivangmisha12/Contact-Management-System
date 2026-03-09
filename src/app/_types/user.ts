export interface UserType {
    id: number;
    email: string;
    name: string;
}

export interface DbUserType extends UserType {
    password: string;
}