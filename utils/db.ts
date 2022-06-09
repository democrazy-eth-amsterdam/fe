import { ServiceAccount } from "firebase-admin"
import { getFirestore } from "firebase-admin/firestore"
import { initializeApp, cert } from "firebase-admin/app"

import credentials from "../cred.json"

initializeApp({ credential: cert(credentials as ServiceAccount) })
const db = getFirestore()

export default db