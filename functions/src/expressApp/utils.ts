import * as admin from "firebase-admin"
import { Request } from "express"

export function getUser(req: Request): admin.auth.DecodedIdToken {
  return req["user"]
}

export function setUser(req: Request, user: admin.auth.DecodedIdToken) {
  req["user"] = user
}
