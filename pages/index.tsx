import type { NextPage } from "next"
import { useEffect, useState } from "react"

import {
    getConnectors,
    WagmiProvider,
    RainbowKitProvider,
    darkTheme as rainbowDarkTheme,
    lightTheme as rainbowLightTheme,
} from "./utils/connectors"
import Sidebar from "./components/sidebar"
import Daolist from "./components/daolist"


/*
 * All theme changes are handled inside the Home component.
 * Theme changes happen by a button click in the Sidebar component
 * so handleThemeChange function is passed to the Sidebar component,
 * which changes the `darkTheme` state. Theme is stored in the
 * localStorage as "theme", which is either "dark" or undefined,
 * in which case it is light.
 *
 * Feel free to use dark: method in tailwind, as handleThemeChange
 * function updates the root element's class. The "dark" prop is passed
 * to components that require extra functionalities other than tailwind
 * which is stored in the `darkTheme` state (true if user prefers dark theme).
 * Dark theme is not dependent on user's color scheme preference, hence
 * window.matchMedia('(prefers-color-scheme: dark)').matches
 * is redundant in theme selection and does not affect the theme.
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

    // On website load, detect user's theme preference.
    useEffect(handleThemeChange, [])

    return (
        <WagmiProvider client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={darkTheme ? rainbowDarkTheme() : rainbowLightTheme()}>
                <div className="h-screen bg-cover" style={{backgroundImage: "url(/background.png)" }}>
                    <div className="flex flex-row h-screen bg-black bg-opacity-20 dark:bg-opacity-70">
                        <Sidebar darkTheme={darkTheme} themeChangeHandler={handleThemeChange} />
                        <div className="w-full">
                            <Daolist darkTheme={darkTheme} themeChangeHandler={handleThemeChange} />
                        </div>
                    </div>
                </div>
            </RainbowKitProvider>
        </WagmiProvider>
    )
}

export default Home
