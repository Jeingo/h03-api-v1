import {blogsCollection, postsCollection} from "./db"
import {ObjectId} from "mongodb";

export const postsRepository = {
    async getAllPost() {
        const tmpRes = await postsCollection.find({}).toArray()
        const res = tmpRes.map(post => ({
            id: post._id,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }))
        return res
    },
    async getPostById(id: string) {
        if(!ObjectId.isValid(id)) {
            return null
        }
        const res = await postsCollection.findOne({_id: new ObjectId(id)})
        if(res) {
            return {
                id: res._id,
                shortDescription: res.shortDescription,
                content: res.content,
                blogId: res.blogId,
                blogName: res.blogName,
                createdAt: res.createdAt
            }
        }
            return null
    },
    async createPost(title: string, desc: string, content: string, blogId: string) {
        const foundBlog = await blogsCollection.findOne({_id: new ObjectId(blogId)})
        if(foundBlog) {
            const createdPost = {
                title: title,
                shortDescription: desc,
                content: content,
                blogId: blogId,
                blogName: foundBlog.name,
                createdAt: new Date().toISOString()
            }
            const res = await postsCollection.insertOne(createdPost)
            return {
                id: res.insertedId.toString(),
                shortDescription: desc,
                content: content,
                blogId: blogId,
                blogName: foundBlog.name,
                createdAt: createdPost.createdAt
            }
        }
        return null
    },
    async updatePost(id: string, title: string, desc: string, content: string, blogId: string) {
        if(!ObjectId.isValid(id) && !ObjectId.isValid(blogId)) {
            return null
        }
        const foundBlog = await blogsCollection.findOne({_id: new ObjectId(blogId)})
        if(foundBlog) {
            const updatePost = await postsCollection
                .updateOne({_id: new ObjectId(id)},
                    {$set: {title: title, shortDescription: desc, content: content, blogId: blogId, blogName: foundBlog.name}})
            return updatePost.matchedCount === 1
        }
        return null
    },
    async deletePost(id: string) {
        if(!ObjectId.isValid(id)) {
            return null
        }
        const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    }
}