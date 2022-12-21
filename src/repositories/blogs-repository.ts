import {blogsCollection} from "./db"
import {ObjectId} from "mongodb"

export const blogsRepository = {
    async getAllBlogs() {
        const tmpRes = await blogsCollection.find({}).toArray()
        const res = tmpRes.map(blog => ({
            id: blog._id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt
        }))
        return res

    },
    async getBlogById(id: string) {
        if(!ObjectId.isValid(id)) {
            return null
        }
        const res = await blogsCollection.findOne({_id: new ObjectId(id)})
        if(res) {
            return {
                id: res._id,
                name: res.name,
                description: res.description,
                websiteUrl: res.websiteUrl,
                createdAt: res.createdAt
            }
        }
        return null
    },
    async createBlog(name: string, desc: string, url: string) {
        const createdBlog = {
            name: name,
            description: desc,
            websiteUrl: url,
            createdAt: new Date().toISOString()
        }
        const res = await blogsCollection.insertOne(createdBlog)
        return {
            id: res.insertedId.toString(),
            name: name,
            description: desc,
            websiteUrl: url,
            createdAt: createdBlog.createdAt
        }
    },
    async updateBlog(id: string, name: string, desc: string, url: string) {
        if(!ObjectId.isValid(id)) {
            return null
        }
        const result = await blogsCollection
            .updateOne({_id: new ObjectId(id)},{$set: {name: name, description: desc, websiteUrl: url}})
        return result.matchedCount === 1
    },
    async deleteBlog(id: string) {
        if(!ObjectId.isValid(id)) {
            return null
        }
        const result = await blogsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    }
}