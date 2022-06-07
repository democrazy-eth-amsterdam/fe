import {
    apiProvider,
    configureChains,
    getDefaultWallets,
    RainbowKitProvider,
    darkTheme,
    lightTheme,
} from "@rainbow-me/rainbowkit"
import { chain, createClient, WagmiProvider } from "wagmi"
import "@rainbow-me/rainbowkit/styles.css"

const getConnectors = () => {
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

    return { wagmiClient, chains, darkTheme }
}

export { getConnectors, WagmiProvider, RainbowKitProvider, darkTheme, lightTheme }
