import TypewriterComponent from "typewriter-effect"

import { DaoInputs } from "./dao-types"

import DaoCard from "../DaoCard"
import { useState } from "react"

interface StepThreeProps {
    daoInputs: DaoInputs
    setStep: (step: number) => void
}

const StepThree = ({ daoInputs, setStep }: StepThreeProps) => {
    const [titleTyped, setTitleTyped] = useState<boolean>(false)

    console.log(daoInputs)

    return (
        <div className="flex flex-col h-full w-full space-y-3">
            <h1 className="text-3xl font-semibold">
                {titleTyped ? (
                    "Is the info you provided correct?"
                ) : (
                    <TypewriterComponent
                        onInit={typewriter => {
                            typewriter
                                .changeDelay(50)
                                .typeString("Is the info you provided correct?")
                                .callFunction(() => setTitleTyped(true))
                                .start()
                        }}
                    />
                )}
            </h1>
            <DaoCard name={daoInputs.name} memberCount={0} logo={daoInputs.logo} preview={true} />
        </div>
    )
}

export default StepThree
