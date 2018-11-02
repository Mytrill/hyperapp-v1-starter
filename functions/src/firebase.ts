import * as admin from "firebase-admin"
import { User } from "./api"
import { USERS } from "./constants"

export function getDoc(collection: string, id: string) {
  return admin.firestore().doc(`/${collection}/${id}`)
}

export function fetchUser(id: string): Promise<User> {
  return getDoc(USERS, id)
    .get()
    .then(snapshot => {
      const user = snapshot.data() as User | undefined
      if (!user) {
        throw `No user with id ${id} found.`
      }
      return user
    })
}
