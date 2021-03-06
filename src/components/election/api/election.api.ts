import { Router } from "express";
import {
    handleGetAllElectionsFromEvent,
    handleAddElection,
    handleGetElectionById,
    handleDeleteElectionById,
    handleUpdateElectionById,
    handleGetElectionResults,
    handleEmitVote,
    handleReadVote
} from "../controller/election.controller";
import { authenticateToken } from "../../../middleware/jwt.middleware";
import { authenticateRole } from "../../../middleware/role.middleware";
import { RoleEnum } from "../../../utils/role.enum";

const router = Router()

router.get('/event/:eventId', authenticateToken, handleGetAllElectionsFromEvent)

router.get('/:electionId/event/:eventId', authenticateToken, handleGetElectionById)

router.post('/event/:eventId', authenticateToken,
    authenticateRole([RoleEnum.ORGANIZER, RoleEnum.COLLABORATOR]), handleAddElection)

router.delete('/:electionId/event/:eventId', authenticateToken,
    authenticateRole([RoleEnum.ORGANIZER]), handleDeleteElectionById)

router.put('/:electionId/event/:eventId', authenticateToken,
    authenticateRole([RoleEnum.ORGANIZER, RoleEnum.COLLABORATOR]), handleUpdateElectionById)

router.get('/:electionId/results', authenticateToken, handleGetElectionResults)

router.post('/:electionId/vote', authenticateToken, authenticateRole([RoleEnum.VOTER]), handleEmitVote)

router.get('/:electionId/vote', authenticateToken, authenticateRole([RoleEnum.VOTER]), handleReadVote)

export { router as electionApi }