import { Dao } from "./types"
import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyClOhCmQqtIHXgIB0k1HnWd0b5TlLh8kAw",
    authDomain: "democrazy-34e96.firebaseapp.com",
    projectId: "democrazy-34e96",
    storageBucket: "democrazy-34e96.appspot.com",
    messagingSenderId: "656524657526",
    appId: "1:656524657526:web:e132fa44e2ae22bb5d7057",
}

const db = getFirestore(initializeApp(firebaseConfig))

export const getDaos = async (): Promise<Dao[]> => {
    return (await getDocs(collection(db, "daos"))).docs.map(doc => doc.data()) as Dao[]
}

export const daoExists = async (daoID: string): Promise<boolean> => {
    return (await getDocs(collection(db, "daos"))).docs.map(doc => doc.id).includes(daoID)
}
