import { BadRequestError } from "../../error/bad.request.error"
import { NotFoundError } from "../../error/not.found.error"
import { InternalError } from "../../error/base.error"
import { Event } from "../../model/event.model"
import { NotPermittedError } from "../../error/not.permitted.error"
import { UserEvent } from "../../model/user.event.model"

export async function validateEvent(eventId: number) {
    try {
        // Find event with specified id
        const event: Event | null = await Event.findOne({ where: { id: eventId } })

        // Check if an event was found
        if (event == null) {
            return Promise.reject(new NotFoundError(4001, "There is no event with the inserted id."))
        }

        if (event.startDate.getTime() <= Date.now()) {
            return Promise.reject(new BadRequestError(4002, "You can't modify a event that has already started."))
        }

        return Promise.resolve(event)
    } catch (error) {

        return Promise.reject(new InternalError(500, error))
    }
}

export async function checkUserEventOwnershipOrCollaboration(eventId: number, userId:number) {
    try {
        const relation: UserEvent | null = await UserEvent.findOne({ where: { userId: userId, eventId: eventId } })

        if (relation == null || (!relation.isOwner && !relation.isCollaborator)) {
            return Promise.reject(new NotPermittedError(4003, "You can't modify a event that is not yours."))
        }

        return Promise.resolve(true)
    } catch (error) {
        return Promise.reject(new InternalError(500, error))
    }
}

export async function checkUserEventOwnership(eventId: number, userId:number) {
    try {
        const relation: UserEvent | null = await UserEvent.findOne({ where: { userId: userId, eventId: eventId } })

        if (relation == null || (!relation.isOwner)) {
            return Promise.reject(new NotPermittedError(4003, "You can't modify a event that is not yours."))
        }

        return Promise.resolve(true)
    } catch (error) {
        return Promise.reject(new InternalError(500, error))
    }
}