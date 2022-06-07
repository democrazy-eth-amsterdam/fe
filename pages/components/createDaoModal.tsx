import { useState } from "react"
import TypewriterComponent from "typewriter-effect"

const INFO_1 =
    "Democrazy enables privacy-preserving off-chain governance voting through the use of zero knowledge proofs and homomorphic encryption. \
With Democrazy, you may now use your governance tokens without revealing \
any information regarding your votes."

const INFO_2 =
    "Democrazy is in beta stage. To create a DAO, you need to have a beta access token. \
If you don't have one, apply for a beta application at forms.gle/some-placeholder-todo"

const INFO_3 = "To get started, please enter your beta access token:"

const CreateDaoModal = () => {
    const [showInputs, setShowInputs] = useState(false)

    return (
        <div className="flex fixed inset-0 bg-slate-600 bg-opacity-50 h-full w-full z-10">
            <div className="bg-slate-800 bg-opacity-95 rounded-2xl m-auto justify-center h-3/5 w-1/2 p-2">
                <div className="h-full w-full p-4 font-mosk text-white shadow-lg drop-shadow-2xl">
                    <h1 className="text-3xl font-semibold">
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
                                    .start()
                            }}
                        />
                    </h1>
                    <br />
                    <p className="text-lg text-slate-200">
                        <TypewriterComponent
                            onInit={typewriter => {
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
                            }}
                        />
                    </p>
                    <br />

                    {showInputs ? <input type="text" /> : <></>}
                </div>
            </div>
        </div>
    )
}

export default CreateDaoModal
