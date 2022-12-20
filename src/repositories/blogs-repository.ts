import {BlogsType, client} from "./db"
import {v4 as uuid} from 'uuid'

export const blogsRepository = {
    async getAllBlogs() {
        return await client.db('service').collection<BlogsType>('blogs').find({}).toArray()
    },
    async getBlogById(id: string) {
        return await client.db('service').collection<BlogsType>('blogs').findOne({id: id})
    },
    async createBlog(name: string, desc: string, url: string) {
        const createdBlog = {
            id: uuid(),
            name: name,
            description: desc,
            websiteUrl: url
        }
        const res = await client.db('service').collection<BlogsType>('blogs').insertOne(createdBlog)
        return createdBlog
    },
    async updateBlog(id: string, name: string, desc: string, url: string) {
        const result = await client.db('service').collection<BlogsType>('blogs')
            .updateOne({id: id},{$set: {name: name, description: desc, websiteUrl: url}})
        return result.matchedCount === 1
    },
    async deleteBlog(id: string) {
        const result = await client.db('service').collection<BlogsType>('blogs').deleteOne({id: id})
        return result.deletedCount === 1
    }
}