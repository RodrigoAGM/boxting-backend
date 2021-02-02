import { User } from "../../model/user.model";
import { Result } from "../result.interface";

export interface LoginInterface {
    registerVoter(object: User): Promise<Result>
    registerOrganizer(user: User, isCollaborator: boolean): Promise<Result>
    login(username: string, password: string, role: number): Promise<Result>
    forgotPassword(userMail: string): Promise<Result>
    validatePasswordToken(userMail: string, passwordToken: string): Promise<Result>
    setNewPassword(userMail: string, token: string, newPassword: string): Promise<Result>
}