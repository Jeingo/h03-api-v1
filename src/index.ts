import express from 'express'
import {blogsRouter} from "./routers/blogs-router"
import {postsRouter} from "./routers/posts-router"
import {testRouter} from "./routers/test-router"
import {runDb} from "./repositories/db"

export const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing/all-data', testRouter)

const startApp = async () => {
    await runDb()
    if(require.main === module) {
        app.listen(PORT, () => {
            console.log(`Server is starting on port: ${PORT}`)
        })
    }
}

startApp()
