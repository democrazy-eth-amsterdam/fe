import type { NextPage } from "next"
import { useEffect, useState } from "react"

import {
    getConnectors,
    WagmiProvider,
    RainbowKitProvider,
    darkTheme as kDarkTheme,
    lightTheme as kLightTheme,
} from "./utils/connectors"
import Sidebar from "./components/sidebar"

/*
 * All theme changes are handled inside the Home component.
 * handleThemeChange function is passed to Sidebar component,
 * which changes darkTheme state. Theme is stored in the
 * localStorage as "theme", which is either "dark" or undefined,
 * in which case it is light.
 */
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
            <RainbowKitProvider chains={chains} theme={darkTheme ? kDarkTheme() : kLightTheme()}>
                <div className="flex flex-row h-screen bg-slate-200">
                    <Sidebar darkTheme={darkTheme} themeChangeHandler={handleThemeChange} />
                    <div className="border-4 border-blue-900 w-full"></div>
                </div>
            </RainbowKitProvider>
        </WagmiProvider>
    )
}

export default Home
