import Image from "next/image"

const Daocard = ({ darkTheme, themeChangeHandler }: { darkTheme: boolean; themeChangeHandler: () => void }) => {
    return (
        <div className="flex flex-col w-[210px] h-[250px] bg-[#F5F5F5] bg-opacity-[15%] rounded-[2rem] text-white items-center shadow-2xl
        hover:bg-opacity-30 duration-300">
            <div className="mt-4">
                <Image
                    src="https://research.binance.com/static/images/projects/gitcoin/logo.png"
                    alt="Dao Image"
                    width="110"
                    height="110"
                    className="rounded-full"
                />
            </div>
            <p className="font-inter text-md font-black mt-0.5">
                Gitcoin
            </p>
            <p className="font-inter text-xs font-extralight">
                13K members
            </p>
            <button className="rounded-full border-2 font-inter text-sm border-white px-11 py-[8px] mt-3 
            hover:bg-white hover:text-black duration-150">View</button>
        </div>
    )
}

export default Daocard