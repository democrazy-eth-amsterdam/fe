const Button = ({ text, onClick }: { text: string; onClick: () => void }) => {
    return (
        <button
            className="rounded-full border-2 font-inter text-sm border-white px-11 py-[8px] mt-3 
            hover:bg-white hover:text-black duration-150 text-white"
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button
