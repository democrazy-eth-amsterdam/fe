import { useRef, useState } from "react"

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
    const [daoNameError, setDaoNameError] = useState<string>("")
    const [inputError, setInputError] = useState<string>("")

    const daoNameRef = useRef() as React.MutableRefObject<HTMLInputElement>

    return (
        <div className="flex flex-col h-full w-full space-y-3">
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
                <div className="flex flex-col space-y-6 h-full w-full">
                    <div className="flex space-x-4">
                        <div className="flex w-full flex-col">
                            <label>DAO Name</label>
                            <input
                                type="text"
                                placeholder="DAO Name"
                                className="rounded-lg bg-gray-900 border-2 border-black w-3/4 p-1 text-sm"
                                maxLength={32}
                                ref={daoNameRef}
                            />
                            <p className="text-red-200 text-sm">{daoNameError}</p>
                        </div>
                        <div className="flex w-full flex-col">
                            <label>Upload DAO Logo</label>
                            <input
                                type="file"
                                className="block rounded bg-clip-padding focus:outline-none border-gray-400 bg-gray-700 border-[1px]"
                                accept="image/*"
                            />
                            <p className="text-red-200 text-sm">{inputError}</p>
                        </div>
                    </div>
                    <div className="flex flex-col h-full">
                        <div className="flex scale-90 origin-left">
                            <div className="flex flex-row space-x-4 w-11/12">
                                <label className="flex items-center">Ethereum:</label>
                                <input
                                    type="text"
                                    placeholder="Token address (empty if none)"
                                    className="rounded-lg bg-gray-900 border-2 border-black w-1/2 p-1 text-sm"
                                    maxLength={42}
                                    ref={daoNameRef}
                                />
                                <p className="flex items-center text-red-200 text-sm">{daoNameError}</p>
                            </div>
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
