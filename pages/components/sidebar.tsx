import { ConnectButton } from "@rainbow-me/rainbowkit"

const Sidebar = () => {
    return (
        <div className="flex flex-col space-b space-y-20 border-4 border-red-900 w-2/12">
            <div className="flex border-4 border-black w-full h-1/6">
                <div className="m-auto border-2 border-emerald-900">
                    <span>Democrazy</span>
                </div>
            </div>
            <div className="flex border-4 border-black w-full h-1/2"></div>
            <div className="flex border-2 border-black w-full h-1/6 mt-auto">
                <ConnectButton />
            </div>
        </div>
    )
}

export default Sidebar
