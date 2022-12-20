import {db} from "./db"
import {v4 as uuid} from 'uuid'


export const blogsRepository = {
    async getAllBlogs() {
        return db.blogs
    },
    async getBlogById(id: string) {
        const foundBlog = db.blogs.find(b => b.id === id)
        return foundBlog
    },
    async createBlog(name: string, desc: string, url: string) {
        const createdBlog = {
            id: uuid(),
            name: name,
            description: desc,
            websiteUrl: url
        }
        db.blogs.push(createdBlog)
        return createdBlog
    },
    async updateBlog(id: string, name: string, desc: string, url: string) {
        const foundBlog = db.blogs.find(b => b.id === id)
        if(foundBlog) {
            foundBlog.name = name
            foundBlog.description = desc
            foundBlog.websiteUrl = url
            return foundBlog
        }
        return null
    },
    async deleteBlog(id: string) {
        const foundBlog = db.blogs.find(b => b.id === id)
        db.blogs = db.blogs.filter(b => b.id !== id)
        return foundBlog
    }
}