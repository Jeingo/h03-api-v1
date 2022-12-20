import {Router, Request, Response} from 'express'
import {HTTP_STATUSES} from "../constats/status"
import {blogsRepository} from "../repositories/blogs-repository"
import {inputValidation} from "../middleware/input-validation"
import {descriptionValidation, nameValidation, websiteUrlValidation} from "../middleware/input-blogs-vallidation"
import {auth} from "../authorization/basic-auth"

export const blogsRouter = Router({})

blogsRouter.get('/', async (req: Request, res: Response) => {
    const allBlogs = await blogsRepository.getAllBlogs()
    res.status(HTTP_STATUSES.OK_200).json(allBlogs)
})

blogsRouter.get('/:id', async (req: Request, res: Response) => {
    const foundBlog = await blogsRepository.getBlogById(req.params.id)

    if(!foundBlog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.json(foundBlog)
})

blogsRouter.use(auth)

blogsRouter.post('/',
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidation,
    async (req: Request, res: Response) => {
    const createdBlog = await blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl)
    res.status(HTTP_STATUSES.CREATED_201).json(createdBlog)
})

blogsRouter.put('/:id',
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidation,
    async (req: Request, res: Response) => {
    const updatedBlog = await blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)

    if(!updatedBlog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

blogsRouter.delete('/:id', async (req: Request, res: Response) => {
    const deletedBlog = await blogsRepository.deleteBlog(req.params.id)

    if(!deletedBlog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

