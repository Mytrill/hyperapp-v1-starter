import * as functions from "firebase-functions"

import { USERS } from "../constants"
import { getDoc } from "../firebase"

/* delete user from firestore on delete account */
export const onDeleteAuthUser = functions.auth.user().onDelete(user => {
  return getDoc(USERS, user.uid).delete()
})
