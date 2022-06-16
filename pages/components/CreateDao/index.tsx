import { useState } from "react"

import StepOne from "./step-one"
import StepTwo from "./step-two"
import StepThree from "./step-three"

import type { DaoInputs, TokenMetadata } from "./dao-types"

interface CreateDaoProps {
    closeHandler: () => void
}

const emptyDaoInputs = {
    apiKey: "",
    name: "",
    logo: "",
    tokenMetadata: {
        ethereum: "",
        optimism: "",
        arbitrum: "",
        polygon: "",
        gnosis: "",
    },
}

// Step 1 => Enter API Key
// Step 2 => Enter DAO Details
// Step 3 => Verify DAO Details

const CreateDao = ({ closeHandler }: CreateDaoProps) => {
    const [step, setStep] = useState<number>(2)
    const [daoInputs, setDaoInputs] = useState<DaoInputs>(emptyDaoInputs)

    const getCurrentStep = () => {
        switch (step) {
            case 1:
                return (
                    <StepOne
                        closeHandler={closeHandler}
                        setApiKey={(key: string) => setDaoInputs({ ...daoInputs, apiKey: key })}
                        setStep={setStep}
                    />
                )
            case 2:
                return (
                    <StepTwo
                        closeHandler={closeHandler}
                        setDaoInputs={(name: string, logo: string, metadata: TokenMetadata) =>
                            setDaoInputs({ ...daoInputs, name, logo, tokenMetadata: metadata })
                        }
                        setStep={setStep}
                    />
                )
            case 3:
                return <StepThree setStep={setStep} daoInputs={daoInputs} />
        }
    }

    return (
        <div className="flex fixed inset-0 bg-slate-600 bg-opacity-50 h-full w-full z-10">
            <div className="bg-gray-600 dark:bg-gray-800 dark:bg-opacity-95 bg-opacity-95 rounded-2xl m-auto justify-center h-3/5 w-1/2 p-2">
                <div className="h-full w-full p-4 font-mosk text-white">{getCurrentStep()}</div>
            </div>
        </div>
    )
}

export default CreateDao
