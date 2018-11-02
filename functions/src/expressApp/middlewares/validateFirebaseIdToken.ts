import { Request, Response, NextFunction } from "express"
import * as admin from "firebase-admin"
import { setUser } from "../utils"
import { StringMap } from "../../api"

const IGNORED: StringMap<boolean> = {}

/**
 * Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
 * The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
 * `Authorization: Bearer <Firebase ID Token>`.
 * when decoded successfully, the ID Token content will be added as `req.user`.
 *
 * See https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js
 */
export function validateFirebaseIdToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`Validating firebase ID token for path ${req.path}`)
  if (IGNORED[req.path]) {
    next()
    return
  }
  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")) &&
    !(req.cookies && req.cookies.__session)
  ) {
    console.error(
      "No Firebase ID token was passed as a Bearer token in the Authorization header.",
      "Make sure you authorize your request by providing the following HTTP header:",
      "Authorization: Bearer <Firebase ID Token>",
      'or by passing a "__session" cookie.'
    )
    res.status(403).send("Unauthorized")
    return
  }

  let idToken
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    console.log('Found "Authorization" header')
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split("Bearer ")[1]
  } else if (req.cookies) {
    console.log('Found "__session" cookie')
    // Read the ID Token from cookie.
    idToken = req.cookies.__session
  } else {
    // No cookie
    res.status(403).send("Unauthorized")
    return
  }
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedUser => {
      console.log("ID Token correctly decoded", decodedUser)
      setUser(req, decodedUser)
      return next()
    })
    .catch(error => {
      console.error("Error while verifying Firebase ID token:", error)
      res.status(403).send("Unauthorized")
    })
}
