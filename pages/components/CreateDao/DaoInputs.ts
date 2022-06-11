export default interface DaoInputs {
    apiKey: string
    name: string
    logo: string
    tokenAddress: {
        [chainID: number]: string
    }
}
