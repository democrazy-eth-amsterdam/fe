import { ConnectButton } from "@rainbow-me/rainbowkit"
import Image from "next/image"

const Sidebar = ({ darkTheme, themeChangeHandler }: { darkTheme: boolean; themeChangeHandler: () => void }) => {
    return (
        <div className="flex flex-col space-b space-y-20 bg-[#E1E1E1] bg-opacity-20 lg:w-[19rem] md:w-60">

            <div className="flex mt-4 w-full h-1/6">
                <div className="flex m-auto rounded-full p-5 items-center justify-center border-[#C4C4C4] bg-white bg-opacity-10">
                    <Image src="/democrazy.svg" width="70" height="70" alt="Logo" />
                </div>
            </div>

            <div className="flex w-full h-1/2">

            </div>

            <div className="flex flex-col w-full h-1/6 mt-auto">
                <div className="flex flex-row m-auto border-4 border-red-900 space-x-2">
                    <Image
                        src={darkTheme ? "/moon.svg" : "/sun.svg"}
                        width="32"
                        height="32"
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
                        className="hover:scale-125 duration-500 cursor-pointer"
                    />
                    {/* TODO: BUG IN SUN IMAGE RENDER, OVERLAPS WTH WALLET BOX */}
                    {/* Uicons by <a href="https://www.flaticon.com/uicons">Flaticon</a> */}
                    <ConnectButton showBalance={false} accountStatus={{ smallScreen: "address" }} />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
