import { BaseInterface } from "./base.interface";
import { Result } from "../result.interface";

export interface EventInterface extends BaseInterface {
    createEvent(object: Object, userId: number): Promise<Result>
    registerVoter(userId: number, eventId: number, accessCode: string): Promise<Result>
    registerCollaborator(object: Object, eventId: number, role: number, userId: number): Promise<Result>
    deleteWithRole(id: string, role: number, userId: number): Promise<Result>
    getByIdWithRole(id: string, role: number, userId: number): Promise<Result>
    updateWithRole(id: string, object: Object, role: number, userId: number): Promise<Result>
}