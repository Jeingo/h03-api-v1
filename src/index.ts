import {runDb} from "./repositories/db"
import {app, PORT} from "./app"

const startApp = async () => {
    await runDb()
    if(require.main === module) {
        app.listen(PORT, () => {
            console.log(`Server is starting on port: ${PORT}`)
        })
    }
}

startApp()
