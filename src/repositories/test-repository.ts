import {BlogsType, client, db} from "./db"

export const testRepository = {
    async deleteAllDB() {
        await client.db('service').collection<BlogsType>('blogs').deleteMany({})
        db.posts = []
    }
}