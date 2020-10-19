import { User } from "../model/user.model";
import { Base } from "./base.interface";
import { Result } from "./result.interface";

export interface Users extends Base{
    registerVoter(object: User): Promise<Result>
    registerOrganizer(object: User): Promise<Result>
    registerAdmin(object: User): Promise<Result>
    registerColaborator(object: User): Promise<Result>
    loginVoter(username:string, password:string): Promise<Result>
    loginOrganizer(username:string, password:string): Promise<Result>
}