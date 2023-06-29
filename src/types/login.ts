export interface LoginCredentials {
    email: string;
    password: string;
    error: { [key: string]: string };
}