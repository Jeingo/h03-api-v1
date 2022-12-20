import {blogsCollection, postsCollection} from "./db"
import {v4 as uuid} from 'uuid'

export const postsRepository = {
    async getAllPost() {
        return await postsCollection.find({}).toArray()
    },
    async getPostById(id: string) {
        return await postsCollection.findOne({id: id})
    },
    async createPost(title: string, desc: string, content: string, blogId: string) {
        const foundBlog = await blogsCollection.findOne({id: blogId})
        if(foundBlog) {
            const createdPost = {
                id: uuid(),
                title: title,
                shortDescription: desc,
                content: content,
                blogId: blogId,
                blogName: foundBlog.name
            }
            const res = await postsCollection.insertOne(createdPost)
            return createdPost
        }
        return null
    },
    async updatePost(id: string, title: string, desc: string, content: string, blogId: string) {
        const foundBlog = await blogsCollection.findOne({id: blogId})
        if(foundBlog) {
            const updatePost = await postsCollection
                .updateOne({id: id},
                    {$set: {title: title, shortDescription: desc, content: content, blogId: blogId, blogName: foundBlog.name}})
            return updatePost.matchedCount === 1
        }
        return null
    },
    async deletePost(id: string) {
        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
}