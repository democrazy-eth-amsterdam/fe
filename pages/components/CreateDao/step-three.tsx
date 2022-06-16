import TypewriterComponent from "typewriter-effect"

import { DaoInputs } from "./dao-types"
import { useState } from "react"

import Button from "../Button"
import DaoCard from "../DaoCard"

interface StepThreeProps {
    daoInputs: DaoInputs
    setStep: (step: number) => void
}

const StepThree = ({ daoInputs, setStep }: StepThreeProps) => {
    const [titleTyped, setTitleTyped] = useState<boolean>(false)

    return (
        <div className="flex p-4 flex-col h-full w-full space-y-3">
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
            <div className="flex pt-4 space-x-4">
                <div className="flex items-center">
                    <DaoCard name={daoInputs.name} memberCount={0} logo={daoInputs.logo} preview={true} />
                </div>
                <div className="flex flex-col space-y-4">
                    <span>Token Addresses:</span>

                    {daoInputs.tokenMetadata.ethereum !== "" ? (
                        <span className="text-blue-300 font-bold">
                            Ethereum:
                            <a
                                href={"https://www.etherscan.io/address/" + daoInputs.tokenMetadata.ethereum}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="text-blue-500 text-sm font-inter"
                            >
                                {" " + daoInputs.tokenMetadata.ethereum}
                            </a>
                        </span>
                    ) : undefined}

                    {daoInputs.tokenMetadata.optimism !== "" ? (
                        <span className="text-red-300 font-bold">
                            Optimism:
                            <a
                                href={"https://optimistic.etherscan.io/address/" + daoInputs.tokenMetadata.optimism}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="text-blue-500 text-sm font-inter"
                            >
                                {" " + daoInputs.tokenMetadata.optimism}
                            </a>
                        </span>
                    ) : undefined}

                    {daoInputs.tokenMetadata.arbitrum !== "" ? (
                        <span className="text-cyan-300 font-bold">
                            Arbitrum:
                            <a
                                href={"https://www.arbiscan.io/address/" + daoInputs.tokenMetadata.arbitrum}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="text-blue-500 text-sm font-inter"
                            >
                                {" " + daoInputs.tokenMetadata.arbitrum}
                            </a>
                        </span>
                    ) : undefined}

                    {daoInputs.tokenMetadata.polygon !== "" ? (
                        <span className="text-purple-300 font-bold">
                            Polygon:
                            <a
                                href={"https://www.polygonscan.com/address/" + daoInputs.tokenMetadata.polygon}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="text-blue-500 text-sm font-inter"
                            >
                                {" " + daoInputs.tokenMetadata.polygon}
                            </a>
                        </span>
                    ) : undefined}

                    {daoInputs.tokenMetadata.gnosis !== "" ? (
                        <span className="text-green-300 font-bold">
                            Gnosis:
                            <a
                                href={"https://blockscout.com/xdai/mainnet/address/" + daoInputs.tokenMetadata.gnosis}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="text-blue-500 text-sm font-inter"
                            >
                                {" " + daoInputs.tokenMetadata.gnosis}
                            </a>
                        </span>
                    ) : undefined}
                    <div className="flex space-x-8 pt-4">
                        <Button text="Let me change!" onClick={() => setStep(2)} />
                        <Button text="Looks correct!" onClick={() => setStep(4)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepThree
