import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useState } from "react"

import Image from "next/image"
import Link from "next/link"

import Button from "./button"
import CreateDaoModal from "./createDaoModal"

const Sidebar = ({ darkTheme, themeChangeHandler }: { darkTheme: boolean; themeChangeHandler: () => void }) => {
    const [showCreateDaoModal, setShowCreateDaoModal] = useState(false)

    return (
        <div className="flex flex-col space-b space-y-15 bg-[#E1E1E1] bg-opacity-20 lg:w-[19rem] md:w-60 shadow-2xl">
            <Link href="/">
                <div className="flex mt-4 w-full h-1/6">
                    <div className="flex m-auto rounded-full p-5 items-center justify-center border-[#C4C4C4] bg-white bg-opacity-10 hover:shadow-lg duration-150 cursor-pointer">
                        <a href="#">
                            <Image src="/democrazy.svg" width="70" height="70" alt="Logo" />
                        </a>
                    </div>
                </div>
            </Link>

            <div className="flex w-full h-1/2"></div>

            <div className="flex flex-col flex-1 w-full h-1/6 mt-auto p-4">
                <div className="flex flex-col flex-1 w-full justify-center">
                    <div className="h-1/6" />
                    <div className="flex flex-row m-auto">
                        <Button text={"Create a Dao"} onClick={() => setShowCreateDaoModal(true)} />
                    </div>
                    <div className="flex flex-row m-auto space-x-2">
                        <Image
                            src={darkTheme ? "/moon.svg" : "/sun.svg"}
                            width="28"
                            height="28"
                            alt="Switch Theme"
                            onClick={() => {
                                if (localStorage.getItem("theme")) {
                                    localStorage.removeItem("theme")
                                    themeChangeHandler()
                                } else {
                                    localStorage.setItem("theme", "dark")
                                    themeChangeHandler()
                                }
                            }}
                            className="hover:scale-105 duration-300 cursor-pointer"
                        />
                        {/* Uicons by <a href="https://www.flaticon.com/uicons">Flaticon</a> */}
                        <ConnectButton showBalance={false} accountStatus={{ smallScreen: "address" }} />
                    </div>
                </div>
            </div>
            {showCreateDaoModal ? <CreateDaoModal closeHandler={() => setShowCreateDaoModal(false)}/> : <></>}
        </div>
    )
}

export default Sidebar
