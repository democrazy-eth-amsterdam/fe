import { useEffect, useState } from "react"

import Daocard from "../DaoCard"
import { getDaos } from "../../../utils/firebase"
import type { Dao } from "../../../utils/types"

const Daolist = () => {
    const [daos, setDaos] = useState<Dao[]>([])

    useEffect(() => {
        getDaos().then(daos => setDaos(daos))
    }, [])

    let key = 0

    return (
        <div className="flex flex-col items-center w-full h-full space-y-7 overflow-auto">
            <div className="h-20 pt-12"></div>
            {!Array.isArray(daos) ? (
                <></>
            ) : (
                daos
                    .reduce(
                        (acc, _, idx, arr) => {
                            if (idx % 4 == 0) {
                                acc.push(arr.slice(idx, idx + 4))
                            }
                            return acc
                        },
                        [[]] as Dao[][]
                    )
                    .map((da: Dao[], idx: number) => {
                        key += 2
                        return !da ? (
                            <></>
                        ) : (
                            <div className="flex space-x-8" key={idx * key}>
                                {da[0] ? (
                                    <Daocard
                                        name={da[0].name}
                                        memberCount={da[0].memberCount}
                                        logo={da[0].logo}
                                        key={idx * key + 1}
                                    />
                                ) : (
                                    <></>
                                )}
                                {da[1] ? (
                                    <Daocard
                                        name={da[1].name}
                                        memberCount={da[1].memberCount}
                                        logo={da[1].logo}
                                        key={idx * key + 2}
                                    />
                                ) : (
                                    <></>
                                )}
                                {da[2] ? (
                                    <Daocard
                                        name={da[2].name}
                                        memberCount={da[2].memberCount}
                                        logo={da[2].logo}
                                        key={idx * key + 3}
                                    />
                                ) : (
                                    <></>
                                )}
                                {da[3] ? (
                                    <Daocard
                                        name={da[3].name}
                                        memberCount={da[3].memberCount}
                                        logo={da[3].logo}
                                        key={idx * key + 4}
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        )
                    })
            )}
            <div className="h-20 pb-12"></div>
        </div>
    )
}

export default Daolist
