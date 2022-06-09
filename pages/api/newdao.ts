import type { NextApiRequest, NextApiResponse } from "next"
import type { Dao } from "../../utils/types"

import db from "../../utils/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ isValid: boolean }>) {
    const {
        query: { type, key },
    } = req
    
    // TODO do hex and length checks before reading firebase to avoid quota excession

    const docs = await db.collection("beta-keys").get()

    for (const doc of docs.docs) {
        if (doc.id == key) {
            if (!doc.data().used) {
                res.json({ isValid: true })
                return
            }
            res.json({ isValid: false })
            return
        }
    }

    res.json({ isValid: false })
}
