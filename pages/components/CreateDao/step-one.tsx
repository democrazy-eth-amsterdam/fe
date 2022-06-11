import { useRef, useState } from "react"

import TypewriterComponent from "typewriter-effect"

import Button from "../Button"

interface StepOneProps {
    closeHandler: () => void
    setApiKey: (key: string) => void
    setStep: (step: number) => void
}

const INFO_1 =
    "Democrazy enables privacy-preserving off-chain governance \
voting through the use of zero knowledge proofs and homomorphic encryption. \
With Democrazy, you may now use your governance tokens without revealing \
any information regarding your choices."

const INFO_2 =
    "Democrazy is in beta stage. To create a DAO, you need to have a beta access token. \
If you don't have one, apply for a beta application at forms.gle/some-placeholder-todo"

const INFO_3 = "To get started, please enter your 128 bit beta access token:"

const StepOne = ({ closeHandler, setApiKey, setStep }: StepOneProps) => {
    const [titleTyped, setTitleTyped] = useState<boolean>(false)
    const [showInputs, setShowInputs] = useState<boolean>(false)
    const [keyError, setKeyError] = useState<string>("")

    const keyRef = useRef() as React.MutableRefObject<HTMLInputElement>

    const checkKey = () => {
        const key = keyRef.current.value

        if (key.length != 32) {
            setKeyError("Access token must be a 64 characters hexadecimal!")
            keyRef.current.style.textDecoration = "line-through"
            return
        }

        if (!/^[0-9a-fA-F]+$/.test(key)) {
            setKeyError("Access token must be a valid hexadecimal")
            keyRef.current.style.textDecoration = "line-through"
            return
        }

        fetch("/api/newdao?type=isValid&key=" + key, { method: "GET", headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(data => {
                if (data.isValid) {
                    setApiKey(key)
                    setShowInputs(false)
                    setStep(2)
                } else {
                    keyRef.current.style.textDecoration = "line-through"
                    setKeyError("Invalid access token!")
                }
            })
    }

    return (
        <div className="h-full w-full space-y-4">
            <h1 className="text-3xl font-semibold">
                {titleTyped ? (
                    "The future is Democrazy."
                ) : (
                    <TypewriterComponent
                        onInit={typewriter => {
                            typewriter
                                .changeDelay(100)
                                .typeString("The future is ")
                                .typeString("private.")
                                .pauseFor(2000)
                                .deleteChars(8)
                                .typeString("anonymous.")
                                .pauseFor(2000)
                                .deleteChars(10)
                                .typeString("Democrazy.")
                                .pauseFor(1000)
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
                            .typeString(INFO_1)
                            .typeString("<br/>")
                            .typeString("<br/>")
                            .pauseFor(2500)
                            .typeString(INFO_2)
                            .pauseFor(2500)
                            .typeString("<br/>")
                            .typeString("<br/>")
                            .typeString(INFO_3)
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
                            ref={keyRef}
                            onInput={() => {
                                if (keyRef.current.style.textDecoration == "line-through") {
                                    keyRef.current.style.textDecoration = "none"
                                    setKeyError("")
                                }
                            }}
                        />
                        <div className="justify-center m-auto">
                            <p className="text-red-200 text-sm">{keyError}</p>
                        </div>
                    </div>
                    <div className="flex space-x-8">
                        <Button onClick={closeHandler} text="Take me back!" />
                        <Button onClick={checkKey} text="Let's go!" />
                    </div>
                </div>
            ) : undefined}
        </div>
    )
}

export default StepOne
