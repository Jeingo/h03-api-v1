import {blogsCollection} from "./db"
import {v4 as uuid} from 'uuid'

export const blogsRepository = {
    async getAllBlogs() {
        return await blogsCollection.find({}).toArray()
    },
    async getBlogById(id: string) {
        return await blogsCollection.findOne({id: id})
    },
    async createBlog(name: string, desc: string, url: string) {
        const createdBlog = {
            id: uuid(),
            name: name,
            description: desc,
            websiteUrl: url,
            createdAt: new Date().toISOString()
        }
        const res = await blogsCollection.insertOne(createdBlog)
        return createdBlog
    },
    async updateBlog(id: string, name: string, desc: string, url: string) {
        const result = await blogsCollection
            .updateOne({id: id},{$set: {name: name, description: desc, websiteUrl: url}})
        return result.matchedCount === 1
    },
    async deleteBlog(id: string) {
        const result = await blogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
}