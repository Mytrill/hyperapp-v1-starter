import * as functions from "firebase-functions"

import { USERS } from "../constants"
import { getDoc } from "../firebase"

/** create user in firestore on sign up/first sign in */
export const onCreateAuthUser = functions.auth.user().onCreate(user => {
  return getDoc(USERS, user.uid).set({
    email: user.email,
    displayName: user.displayName
  })
})
