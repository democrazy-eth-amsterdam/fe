import Image from "next/image"
import Button from "./button"

const Daocard = ({
    name,
    memberCount,
    logo,
    preview,
}: {
    name: string
    memberCount: number
    logo: string
    preview: boolean
}) => {
    return (
        <div
            className={[
                "flex",
                "flex-col",
                "w-[210px]",
                "h-[250px]",
                "bg-[#F5F5F5]",
                "bg-opacity-[15%]",
                "rounded-[2rem]",
                "text-white",
                "items-center",
                "shadow-2xl",
            ]
                .concat(preview ? [] : ["hover:bg-opacity-30", "duration-300"])
                .join(" ")}
        >
            <div className="mt-4">
                <Image src={logo} alt="Dao Image" width="110" height="110" className="rounded-full" />
            </div>
            <p className="font-inter text-md font-black mt-0.5">{name}</p>
            {/* TODO: Localize member count */}
            <p className="font-inter text-xs font-extralight">{memberCount} members</p>
            {preview ? (
                <div className="rounded-full border-2 font-inter text-sm border-white px-11 py-[8px] mt-3 text-white select-none">
                    View
                </div>
            ) : (
                <Button text={"View"} onClick={() => {}} />
            )}
        </div>
    )
}

export default Daocard
