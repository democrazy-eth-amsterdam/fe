import { useState } from "react"

import TypewriterComponent from "typewriter-effect"

import Button from "../Button"

import type { TokenMetadata } from "./dao-types"

interface StepTwoProps {
    closeHandler: () => void
    setDaoName: (name: string) => void
    setDaoLogo: (logo: string) => void
    setTokenMetadata: (metadata: TokenMetadata) => void
}

const StepTwo = ({ closeHandler, setDaoName, setDaoLogo, setTokenMetadata }: StepTwoProps) => {
    const [titleTyped, setTitleTyped] = useState<boolean>(false)
    const [showInputs, setShowInputs] = useState<boolean>(false)

    return (
        <div className="h-full w-full space-y-4">
            <h1 className="text-3xl font-semibold">
                {titleTyped ? (
                    "Welcome to Democrazy!"
                ) : (
                    <TypewriterComponent
                        onInit={typewriter => {
                            typewriter
                                .changeDelay(100)
                                .typeString("Welcome to Democrazy!")
                                .callFunction(() => setTitleTyped(true))
                                .start()
                        }}
                    />
                )}
            </h1>
            <p className="text-lg font-mosk">
                <TypewriterComponent
                    onInit={typewriter =>
                        typewriter
                            .changeDelay(25)
                            .pauseFor(2500)
                            .typeString("To get started, enter a few details about your DAO:")
                            .callFunction(() => setShowInputs(true))
                            .start()
                    }
                />
            </p>
            {showInputs ? (
                <div className="flex flex-col space-y-4">
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            className="rounded-lg bg-gray-900 border-2 border-black w-1/2 p-1 text-sm"
                            maxLength={32}
                        />
                        <div className="justify-center m-auto">
                            <p className="text-red-200 text-sm">{2}</p>
                        </div>
                    </div>
                    <div className="flex space-x-8">
                        <Button onClick={closeHandler} text="Take me back!" />
                        <Button text="Next!" />
                    </div>
                </div>
            ) : undefined}
        </div>
    )
}

export default StepTwo
