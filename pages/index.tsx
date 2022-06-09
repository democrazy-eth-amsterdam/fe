import type { NextPage } from "next"
import { useEffect, useState } from "react"

import {
    getConnectors,
    WagmiProvider,
    RainbowKitProvider,
    darkTheme as rainbowDarkTheme,
    lightTheme as rainbowLightTheme,
} from "../utils/connectors"

import Sidebar from "./components/Sidebar"
import Daolist from "./components/Daolist"

const Home: NextPage = () => {
    const { wagmiClient, chains } = getConnectors()

    const [darkTheme, setDarkTheme] = useState(false)

    const handleThemeChange = () => {
        if (localStorage.getItem("theme")) {
            setDarkTheme(true)
            document.documentElement.classList.add("dark")
        } else {
            setDarkTheme(false)
            document.documentElement.classList.remove("dark")
        }
    }

    useEffect(handleThemeChange, [])

    return (
        <WagmiProvider client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={darkTheme ? rainbowDarkTheme() : rainbowLightTheme()}>
                <div className="h-screen bg-cover" style={{ backgroundImage: "url(/background.png)" }}>
                    <div className="flex flex-row h-screen bg-black bg-opacity-20 dark:bg-opacity-70">
                        <Sidebar darkTheme={darkTheme} themeChangeHandler={handleThemeChange} />
                        <div className="w-full">
                            <Daolist />
                        </div>
                    </div>
                </div>
            </RainbowKitProvider>
        </WagmiProvider>
    )
}

export default Home
