import TypewriterComponent from "typewriter-effect"

import { useRef, useState } from "react"

import Daocard from "../DaoCard"
import Button from "../Button"

import { daoExists } from "../../../utils/firebase"

const INFO_1 =
    "Democrazy enables privacy-preserving off-chain governance voting through the use of zero knowledge proofs and homomorphic encryption. \
With Democrazy, you may now use your governance tokens without revealing \
any information regarding your choices."

const INFO_2 =
    "Democrazy is in beta stage. To create a DAO, you need to have a beta access token. \
If you don't have one, apply for a beta application at forms.gle/some-placeholder-todo"

const INFO_3 = "To get started, please enter your 256 bit beta access token:"

const INFO_4 = "Before getting started, you have to fill in a few details about your DAO."

const INFO_5 = "This is your DAO card. You may not change this later."

const CreateDao = ({ closeHandler }: { closeHandler: () => void }) => {
    const [titleDone, setTitleDone] = useState(false)
    const [showInputs, setShowInputs] = useState(false)
    const [tokenError, setTokenError] = useState("")
    const [daoNameError, setDaoNameError] = useState("")
    const [logoError, setLogoError] = useState("")
    const [daoInfo, setDAOInfo] = useState({
        apiKey: "",
        name: "",
        logo: "",
        tokenAddress: "",
    })
    const [phase, setPhase] = useState(2)

    const betaRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const daoNameRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const logoRef = useRef() as React.MutableRefObject<HTMLInputElement>

    const checkKey = () => {
        const key = betaRef.current.value

        if (key.length != 64) {
            setTokenError("Access token must be a 64 characters hexadecimal!")
            betaRef.current.style.textDecoration = "line-through"
            return
        }

        if (!/^[0-9a-fA-F]+$/.test(key)) {
            setTokenError("Access token must be a valid hexadecimal")
            betaRef.current.style.textDecoration = "line-through"
            return
        }

        fetch("/api/newdao?type=isValid&key=" + key, { method: "GET", headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(data => {
                if (data.isValid) {
                    setDAOInfo({ ...daoInfo, apiKey: key })
                    setShowInputs(false)
                    setPhase(2)
                } else {
                    betaRef.current.style.textDecoration = "line-through"
                    setTokenError("Invalid access token!")
                }
            })
    }

    const daoInfoValidity = () => {
        const daoName = daoNameRef.current.value
        const daoIdentifier = daoName.replaceAll(" ", "-").toLowerCase()
        const files = logoRef.current.files

        if (daoName.length <= 2) {
            setDaoNameError("DAO Name must be at least 3 characters long")
            daoNameRef.current.style.textDecoration = "line-through"
            return
        }

        if (!files) {
            setLogoError("Logo not uploaded")
            return
        }

        if (files.length != 1) {
            setLogoError("Logo not uploaded")
            return
        }

        setLogoError("")

        daoExists(daoIdentifier).then(exists => {
            if (exists) {
                setDaoNameError("A DAO with a similar name exists already.")
                return
            }
            const reader = new FileReader()
            reader.onload = event => {
                setDAOInfo({
                    ...daoInfo,
                    name: daoNameRef.current.value,
                    logo: event.target?.result as string,
                })
                setShowInputs(false)
                setPhase(3)
            }
            reader.readAsDataURL(files[0])
        })
    }

    return (
        <div className="flex fixed inset-0 bg-slate-600 bg-opacity-50 h-full w-full z-10">
            <div className="bg-gray-600 dark:bg-slate-800 bg-opacity-95 rounded-2xl m-auto justify-center h-3/5 w-1/2 p-2">
                <div className="h-full w-full p-4 font-mosk text-white shadow-lg drop-shadow-2xl">
                    {phase == 1 ? (
                        <div>
                            <h1 className="text-3xl font-semibold">
                                {titleDone ? (
                                    <span>The future is Democrazy.</span>
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
                                                .callFunction(() => setTitleDone(true))
                                                .start()
                                        }}
                                    />
                                )}
                            </h1>
                            <br />
                            <p className="text-lg text-slate-200">
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
                            <br />
                            {showInputs ? (
                                <div className="flex flex-col space-y-4">
                                    <div className="flex flex-row space-x-4">
                                        <input
                                            type="text"
                                            className="rounded-lg bg-slate-400 outline-2 w-1/2 text-neutral-800 font-extrabold p-1"
                                            maxLength={64}
                                            ref={betaRef}
                                            onInput={() => {
                                                if (betaRef.current.style.textDecoration == "line-through") {
                                                    betaRef.current.style.textDecoration = "none"
                                                    setTokenError("")
                                                }
                                            }}
                                        />
                                        <div className="justify-center m-auto">
                                            <p className="text-red-200 text-sm">{tokenError}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-4">
                                        <Button text={"Take me back!"} onClick={closeHandler} />
                                        <Button text={"Let's go!!!"} onClick={checkKey} />
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-auto fixed left-8 bottom-8">
                                    <Button text={"Take me back!"} onClick={closeHandler} />
                                </div>
                            )}
                        </div>
                    ) : phase == 2 ? (
                        <div className="flex flex-col ml-2 h-full space-y-2">
                            <div className="flex">
                                <h1 className="text-3xl font-semibold">Welcome to Democrazy.</h1>
                            </div>
                            <div className="flex pt-2">
                                <div className="flex flex-col w-full space-y-2">
                                    <p className="text-lg">{INFO_4}</p>
                                </div>
                            </div>
                            <div className="flex flex-row h-full w-full border-4 border-red-500">
                                <div className="flex h-full w-full flex-col space-y-16 p-4 border-4 border-green-400">
                                    <div className="flex flex-col w-full">
                                        <label className="block">DAO Name</label>
                                        <div className="flex flex-row space-x-4">
                                            <input
                                                type="text"
                                                placeholder="DAO Name"
                                                className="rounded-lg bg-gray-700 outline-2 w-full font-extrabold p-1 text-neutral-200 placeholder:text-neutral-400"
                                                maxLength={32}
                                                ref={daoNameRef}
                                                onInput={() => {
                                                    if (daoNameRef.current.style.textDecoration == "line-through") {
                                                        daoNameRef.current.style.textDecoration = "none"
                                                        setDaoNameError("")
                                                    }
                                                }}
                                            />
                                            <div className="flex m-auto w-full">
                                                <p className="text-red-200 text-sm">{daoNameError}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <label className="block">Upload DAO Logo</label>
                                        <div className="flex flex-row w-full space-x-4">
                                            <input
                                                className="block w-full cursor-pointer"
                                                id="file_input"
                                                type="file"
                                                accept="image/*"
                                                ref={logoRef}
                                            />
                                            <div className="flex m-auto w-full">
                                                <p className="text-red-200 text-sm">{logoError}</p>
                                            </div>
                                        </div>
                                        <span className="font-bold">Accepted file types: SVG, PNG, JPG</span>
                                    </div>
                                </div>
                                <div className="flex h-full w-full flex-col space-y-4 border-4 p-4"></div>
                            </div>
                            <div className="flex flex-row space-x-4 pb-6">
                                <Button text={"Take me back!"} onClick={closeHandler} />
                                <Button text={"Next..."} onClick={daoInfoValidity} />
                            </div>
                        </div>
                    ) : phase == 3 ? (
                        <div className="flex flex-col ml-2 h-full space-y-2">
                            <div className="flex">
                                <h1 className="text-3xl font-semibold">Looking good?</h1>
                            </div>
                            <div className="flex pt-2">
                                <div className="flex flex-col w-full space-y-2">
                                    <p className="text-lg">{INFO_5}</p>
                                </div>
                            </div>
                            <div className="flex h-full w-full justify-center items-center">
                                <Daocard name={daoInfo.name} memberCount={0} logo={daoInfo.logo} preview={true} />
                            </div>
                            <div className="flex flex-row space-x-4 pb-6">
                                <Button
                                    text={"Go back"}
                                    onClick={() => {
                                        setPhase(2)
                                        setDAOInfo({ ...daoInfo, name: "", logo: "" })
                                    }}
                                />
                                <Button text={"Looks fine!"} onClick={() => setPhase(4)} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col ml-2 h-full space-y-2">
                            <div className="flex">
                                <h1 className="text-3xl font-semibold">Token Details</h1>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateDao
