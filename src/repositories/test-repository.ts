import {db} from "./db"

export const testRepository = {
    deleteAllDB() {
        db.blogs = []
        db.posts = []
    }
}