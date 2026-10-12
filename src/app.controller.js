import helmet from "helmet"
import connectDB from "./DB/connect.js"
import authRouter from "./modules/auth/auth.routes.js"
import commentRouter from "./modules/comments/comment.routes.js"
import postRouter from "./modules/posts/post.routes.js"
import userRouter from "./modules/user/user.routes.js"
import cors from "cors"
import rateLimit from "express-rate-limit"
import { createHandler } from "graphql-http/lib/use/express"
import { schema } from "./app.schema.js"
const bootstrap = async (app, express) => {
    app.use(express.json())
    const limiter = rateLimit({
        limit: 3,
        windowMs: 2 * 60 * 1000,
        message: "too many requests"
    })
    app.use("/auth", limiter)
    app.use(cors())
    app.use(helmet())
    app.use("/graphql", createHandler({
        schema, context: (req) => {
            const { authorization } = req.headers
            return { authorization }
        }
    }))
    await connectDB()

    app.use("/auth", authRouter)
    app.use("/user", userRouter)
    app.use("/post", postRouter)
    app.use("/comment", commentRouter)

    app.use((req, res) => {
        res.status(404).json({ message: "not found" })
    })
    app.use((error, req, res, next) => {
        const status = error.cause;
        res.status(500).json({ message: error.message, stack: error.stack })
    })
}


export default bootstrap