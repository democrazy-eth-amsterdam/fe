export interface DaoInputs {
    apiKey: string
    name: string
    logo: string
    tokenMetadata: TokenMetadata
}

export interface TokenMetadata {
    ethereum: string,
    optimism: string,
    arbitrum: string,
    gnosis: string,
    polygon: string
}