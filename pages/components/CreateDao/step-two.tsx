import React, { useRef, useState } from "react"

import { daoExists } from "../../../utils/firebase"

import TypewriterComponent from "typewriter-effect"

import Button from "../Button"

import type { TokenMetadata } from "./dao-types"

interface StepTwoProps {
    closeHandler: () => void
    setDaoName: (name: string) => void
    setDaoLogo: (logo: string) => void
    setTokenMetadata: (metadata: TokenMetadata) => void
    setStep: (step: number) => void
}

interface AddressError {
    ethereum: string
    optimism: string
    arbitrum: string
    polygon: string
    gnosis: string
}

const emptyAddressError = {
    ethereum: "",
    optimism: "",
    arbitrum: "",
    polygon: "",
    gnosis: "",
}

type Ref = React.MutableRefObject<HTMLInputElement>

const StepTwo = ({ closeHandler, setDaoName, setDaoLogo, setTokenMetadata, setStep }: StepTwoProps) => {
    const [titleTyped, setTitleTyped] = useState<boolean>(false)
    const [showInputs, setShowInputs] = useState<boolean>(false)
    const [daoNameError, setDaoNameError] = useState<string>("")
    const [logoError, setLogoError] = useState<string>("")
    const [addressError, setAddressError] = useState<AddressError>(emptyAddressError)

    const daoNameRef = useRef() as Ref
    const logoRef = useRef() as Ref

    const ethRef = useRef() as Ref
    const optiRef = useRef() as Ref
    const arbiRef = useRef() as Ref
    const polyRef = useRef() as Ref
    const gnoRef = useRef() as Ref

    const errMap = new Map<Ref, (err: string) => void>()

    errMap.set(ethRef, (err: string) => setAddressError({ ...addressError, ethereum: err }))
    errMap.set(optiRef, (err: string) => setAddressError({ ...addressError, optimism: err }))
    errMap.set(arbiRef, (err: string) => setAddressError({ ...addressError, arbitrum: err }))
    errMap.set(polyRef, (err: string) => setAddressError({ ...addressError, polygon: err }))
    errMap.set(gnoRef, (err: string) => setAddressError({ ...addressError, gnosis: err }))

    const checkAddress = (ref: Ref): boolean => {
        if (ref.current.value === "") return true
        if (ethRef.current.value.substring(0, 2) !== "0x") {
            errMap.get(ref)!("Address must be a valid hexadecimal starting with 0x")
            return false
        }
        if (ethRef.current.value.length !== 42) {
            errMap.get(ref)!("Address must be 42 characters long!")
            return false
        }
        if (!/^[0-9a-fA-F]+$/.test(ethRef.current.value.substring(2))) {
            errMap.get(ref)!("Address must be a valid hexadecimal starting with 0x")
            ref.current.style.textDecoration = "line-through"
            return false
        }
        return true
    }

    const validateInfo = () => {
        const daoName = daoNameRef.current.value
        const daoIdentifier = daoName.replaceAll(" ", "-").toLowerCase()
        const files = logoRef.current.files

        if (daoName.length <= 2) {
            setDaoNameError("DAO Name must be at least 3 characters long.")
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

        if (
            !(
                ethRef.current.value != "" ||
                optiRef.current.value != "" ||
                arbiRef.current.value != "" ||
                polyRef.current.value != "" ||
                gnoRef.current.value != ""
            )
        ) {
            setAddressError({ ...addressError, ethereum: "You must enter a token address on at least one chain." })
            return
        }

        const allValid =
            checkAddress(ethRef) &&
            checkAddress(optiRef) &&
            checkAddress(arbiRef) &&
            checkAddress(polyRef) &&
            checkAddress(gnoRef)

        if (!allValid) return

        daoExists(daoIdentifier).then(exists => {
            if (exists) {
                setDaoNameError("A DAO with a similar name exists already.")
                return
            }
            const reader = new FileReader()
            reader.onload = event => {
                setDaoName(daoNameRef.current.value)
                setDaoLogo(event.target?.result as string)
                setTokenMetadata({
                    ethereum: ethRef.current.value,
                    optimism: optiRef.current.value,
                    arbitrum: arbiRef.current.value,
                    polygon: polyRef.current.value,
                    gnosis: gnoRef.current.value,
                })
                setShowInputs(false)
                setStep(3)
            }
            reader.readAsDataURL(files[0])
        })
    }

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
                <div className="flex flex-col space-y-6 h-full w-full justify-evenly">
                    <div className="flex space-x-4 justify-evenly">
                        <div className="flex w-full flex-col justify-evenly">
                            <label>DAO Name</label>
                            <input
                                type="text"
                                placeholder="DAO Name"
                                className="rounded-lg bg-gray-900 border-2 border-black w-3/4 p-1 text-sm"
                                maxLength={32}
                                ref={daoNameRef}
                                onInput={() => {
                                    setDaoNameError("")
                                    daoNameRef.current.style.textDecoration = "none"
                                }}
                            />
                            <p className="text-red-200 text-sm">{daoNameError}</p>
                        </div>
                        <div className="flex w-full flex-col justify-evenly">
                            <label>Upload DAO Logo</label>
                            <input
                                type="file"
                                className="block rounded bg-clip-padding focus:outline-none border-gray-400 bg-gray-700 border-[1px]"
                                accept="image/*"
                                ref={logoRef}
                            />
                            <p className="text-red-200 text-sm">{logoError}</p>
                        </div>
                    </div>
                    <div className="flex flex-col h-full justify-evenly">
                        <div className="flex scale-90 origin-left">
                            <div className="flex flex-row space-x-4 w-11/12">
                                <label className="flex items-center">Ethereum:{"\u00A0"}</label>
                                <input
                                    type="text"
                                    placeholder="Token address (empty if none)"
                                    className="rounded-lg bg-gray-900 border-2 border-black w-1/2 p-1 text-sm"
                                    maxLength={42}
                                    ref={ethRef}
                                    onInput={() => {
                                        errMap.get(ethRef)!("")
                                        ethRef.current.style.textDecoration = "none"
                                    }}
                                />
                                <p className="flex items-center text-red-200 text-sm">{addressError.ethereum}</p>
                            </div>
                        </div>
                        <div className="flex scale-90 origin-left">
                            <div className="flex flex-row space-x-4 w-11/12">
                                <label className="flex items-center">Optimism:{"\u00A0"}</label>
                                <input
                                    type="text"
                                    placeholder="Token address (empty if none)"
                                    className="rounded-lg bg-gray-900 border-2 border-black w-1/2 p-1 text-sm"
                                    maxLength={42}
                                    ref={optiRef}
                                    onInput={() => {
                                        errMap.get(optiRef)!("")
                                        optiRef.current.style.textDecoration = "none"
                                    }}
                                />
                                <p className="flex items-center text-red-200 text-sm">{addressError.optimism}</p>
                            </div>
                        </div>
                        <div className="flex scale-90 origin-left">
                            <div className="flex flex-row space-x-4 w-11/12">
                                <label className="flex items-center">
                                    Arbitrum:{"\u00A0"}
                                    {"\u00A0"}
                                </label>
                                <input
                                    type="text"
                                    placeholder="Token address (empty if none)"
                                    className="rounded-lg bg-gray-900 border-2 border-black w-1/2 p-1 text-sm"
                                    maxLength={42}
                                    ref={arbiRef}
                                    onInput={() => {
                                        errMap.get(arbiRef)!("")
                                        arbiRef.current.style.textDecoration = "none"
                                    }}
                                />
                                <p className="flex items-center text-red-200 text-sm">{addressError.arbitrum}</p>
                            </div>
                        </div>
                        <div className="flex scale-90 origin-left">
                            <div className="flex flex-row space-x-4 w-11/12">
                                <label className="flex items-center">
                                    Polygon:{"\u00A0"}
                                    {"\u00A0"}
                                    {"\u00A0"}
                                </label>
                                <input
                                    type="text"
                                    placeholder="Token address (empty if none)"
                                    className="rounded-lg bg-gray-900 border-2 border-black w-1/2 p-1 text-sm"
                                    maxLength={42}
                                    ref={polyRef}
                                    onInput={() => {
                                        errMap.get(polyRef)!("")
                                        polyRef.current.style.textDecoration = "none"
                                    }}
                                />
                                <p className="flex items-center text-red-200 text-sm">{addressError.polygon}</p>
                            </div>
                        </div>
                        <div className="flex scale-90 origin-left">
                            <div className="flex flex-row space-x-4 w-11/12">
                                <label className="flex items-center">
                                    Gnosis:{"\u00A0"}
                                    {"\u00A0"}
                                    {"\u00A0"}
                                    {"\u00A0"}
                                    {"\u00A0"}
                                    {"\u00A0"}
                                </label>
                                <input
                                    type="text"
                                    placeholder="Token address (empty if none)"
                                    className="rounded-lg bg-gray-900 border-2 border-black w-1/2 p-1 text-sm"
                                    maxLength={42}
                                    ref={gnoRef}
                                    onInput={() => {
                                        errMap.get(gnoRef)!("")
                                        gnoRef.current.style.textDecoration = "none"
                                    }}
                                />
                                <p className="flex items-center text-red-200 text-sm">{addressError.gnosis}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-8">
                        <Button onClick={closeHandler} text="Take me back!" />
                        <Button text="Next!" onClick={validateInfo} />
                    </div>
                </div>
            ) : undefined}
        </div>
    )
}

export default StepTwo
