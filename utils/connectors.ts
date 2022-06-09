import "@rainbow-me/rainbowkit/styles.css"

import { chain, createClient, WagmiProvider } from "wagmi"
import {
    apiProvider,
    configureChains,
    getDefaultWallets,
    RainbowKitProvider,
    darkTheme,
    lightTheme,
} from "@rainbow-me/rainbowkit"

const getConnectors = () => {
    const { chains, provider } = configureChains(
        [chain.mainnet],
        [
            apiProvider.jsonRpc(() => {
                return { rpcUrl: "https://rpc.ankr.com/eth" }
            }),
        ]
    )

    const { connectors } = getDefaultWallets({ appName: "Democazy", chains })

    const wagmiClient = createClient({
        autoConnect: true,
        connectors,
        provider,
    })

    return { wagmiClient, chains, darkTheme }
}

export { getConnectors, WagmiProvider, RainbowKitProvider, darkTheme, lightTheme }
