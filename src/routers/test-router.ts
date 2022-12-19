import {Router, Request, Response} from 'express'
import {HTTP_STATUSES} from "../constats/status"
import {testRepository} from "../repositories/test-repository";

export const testRouter = Router({})

testRouter.delete('/', (req: Request, res: Response) => {
    testRepository.deleteAllDB()
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})