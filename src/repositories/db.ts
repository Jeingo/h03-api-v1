import {MongoClient} from "mongodb"
import * as dotenv from 'dotenv'
dotenv.config()

const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017'

export const client = new MongoClient(mongoUrl)

export const runDb = async () => {
    try {
        await client.connect()
        console.log('Connected successfully to mongo db')
    } catch (err) {
        console.log(`Can't connect to mongo db: ` + err)
        await client.close()
    }
}

const db = client.db('service')
export const blogsCollection = db.collection<BlogsType>('blogs')
export const postsCollection = db.collection<BlogsType>('posts')

export type BlogsType = {
    id: string
    name: string
    description: string
    websiteUrl: string
}

export type PostsType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}