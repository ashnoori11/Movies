export enum Role {
    Admin = "admin",
    User = "user",
}

export class RoleHelper {
    static getAdminRole(): string {
        return Role.Admin;
    }
}