import {db} from "./db"

export const testRepository = {
    async deleteAllDB() {
        db.blogs = []
        db.posts = []
    }
}