import { ReactElement, useEffect, useState } from "react"

import { getDaos } from "../../../utils/firebase"
import type { Dao } from "../../../utils/types"

import Daocard from "../DaoCard"

const Daolist = () => {
    const [daos, setDaos] = useState<Dao[][]>([])

    useEffect(() => {
        getDaos().then(daos => setDaos(transpose(daos)))
    }, [])

    const transpose = (daoArray: Dao[]): Dao[][] => {
        const daoMatrix = []
        for (let i = 0; i < daoArray.length; i += 4) {
            daoMatrix.push(daoArray.slice(i, i + 4))
        }
        return daoMatrix
    }

    const getCard = (dao: Dao, key: number): ReactElement => {
        return <Daocard name={dao.name} memberCount={dao.memberCount} logo={dao.logo} key={key} />
    }

    const getCards = (daoMatrix: Dao[][]): ReactElement => {
        return (
            <>
                {daoMatrix.map((daoArray: Dao[], i: number) => {
                    return (
                        <div className="flex space-x-8" key={i}>
                            {daoArray.map((d: Dao, j: number) => {
                                return getCard(d, j)
                            })}
                        </div>
                    )
                })}
            </>
        )
    }

    // TODO: ICY Loading Effect if daos.length == 0

    return (
        <div className="flex flex-col items-center w-full h-full space-y-7 overflow-auto">
            <div className="h-20 pt-12"></div>
            {daos ? getCards(daos) : undefined}
            <div className="h-20 pb-12"></div>
        </div>
    )
}

export default Daolist
