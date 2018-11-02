import * as functions from "firebase-functions"
import * as admin from "firebase-admin"

import { app } from "./expressApp"

export * from "./handlers"

admin.initializeApp()
const settings = { timestampsInSnapshots: true }
admin.firestore().settings(settings)

// nothing for now
export const expressApp = functions.https.onRequest(app)
