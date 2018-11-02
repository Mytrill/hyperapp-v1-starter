import { Route } from "./api"
import { NAME } from "../../constants"

export const hello: Route = {
  path: "/hello",
  handler(_, res) {
    return res.send(`Hello ${NAME}`)
  }
}
