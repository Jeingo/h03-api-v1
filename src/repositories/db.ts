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

export const db:{blogs: Array<BlogsType>, posts: Array<PostsType>} = {
    blogs: [
        {
            id: '1',
            name: 'Name',
            description: 'Description',
            websiteUrl: 'URL'
        }
    ],
    posts: [
        {
            id: '1',
            title: 'Title',
            shortDescription: 'Short Description',
            content: 'Content',
            blogId: '1',
            blogName: 'Name'
        }
    ]
}