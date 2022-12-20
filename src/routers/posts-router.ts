import {Router, Request, Response} from 'express'
import {HTTP_STATUSES} from "../constats/status"
import {postsRepository} from "../repositories/posts-repository"
import {inputValidation} from "../middleware/input-validation"
import {
    blogIdValidation,
    contentValidation,
    shortDescriptionValidation,
    titleValidation
} from "../middleware/input-posts-validation"
import {auth} from "../authorization/basic-auth"

export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response) => {
    const allPosts = await postsRepository.getAllPost()
    res.status(HTTP_STATUSES.OK_200).json(allPosts)
})

postsRouter.get('/:id', async (req: Request, res: Response) => {
    const foundPost = await postsRepository.getPostById(req.params.id)

    if(!foundPost) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.json(foundPost)
})

postsRouter.use(auth)

postsRouter.post('/',
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    inputValidation,
    async (req: Request, res: Response) => {
    const createdPost = await postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    res.status(HTTP_STATUSES.CREATED_201).json(createdPost)
})

postsRouter.put('/:id',
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    inputValidation,
    async (req: Request, res: Response) => {
    const updatedPost = await postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)

    if(!updatedPost) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

postsRouter.delete('/:id', async (req: Request, res: Response) => {
    const deletedPost = await postsRepository.deletePost(req.params.id)

    if(!deletedPost) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})