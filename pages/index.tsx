import type { NextPage } from "next"
import {
    apiProvider,
    configureChains,
    getDefaultWallets,
    RainbowKitProvider,
} from "@rainbow-me/rainbowkit"
import { chain, createClient, WagmiProvider } from "wagmi"
import "@rainbow-me/rainbowkit/styles.css"

import Sidebar from "./components/sidebar"

const Home: NextPage = () => {
    const { chains, provider } = configureChains(
        [chain.mainnet],
        [
            apiProvider.jsonRpc(() => {
                return { rpcUrl: "https://mainnet.eth.aragon.network/" }
            }),
        ]
    )

    const { connectors } = getDefaultWallets({ appName: "Democazy", chains })

    const wagmiClient = createClient({
        autoConnect: true,
        connectors,
        provider,
    })

    return (
        <WagmiProvider client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <div className="flex flex-row h-screen bg-slate-200">
                    <Sidebar />
                    <div className="border-4 border-blue-900 w-full"></div>
                </div>
            </RainbowKitProvider>
        </WagmiProvider>
    )
}

export default Home
