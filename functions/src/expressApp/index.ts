import * as cors from "cors"
import * as express from "express"
import * as cookieParser from "cookie-parser"

import { validateFirebaseIdToken } from "./middlewares"
import { hello } from "./routes"

const app = express()

app.use(cors({ origin: true }))
app.use(cookieParser())
app.use(validateFirebaseIdToken)

app.post(hello.path, hello.handler)

export { app }
