import Daocard from "./daocard"

const Daolist = ({ darkTheme, themeChangeHandler }: { darkTheme: boolean; themeChangeHandler: () => void }) => {
    return (
        <div className="flex flex-col items-center w-full h-full space-y-7 overflow-auto">
            <div className="h-20 pt-12"></div>
            <div className="flex space-x-8">
                <Daocard darkTheme={darkTheme} themeChangeHandler={themeChangeHandler} />
                <Daocard darkTheme={darkTheme} themeChangeHandler={themeChangeHandler} />
                <Daocard darkTheme={darkTheme} themeChangeHandler={themeChangeHandler} />
                <Daocard darkTheme={darkTheme} themeChangeHandler={themeChangeHandler} />
            </div>
            <div className="flex space-x-8">
                <Daocard darkTheme={darkTheme} themeChangeHandler={themeChangeHandler} />
                <Daocard darkTheme={darkTheme} themeChangeHandler={themeChangeHandler} />
                <Daocard darkTheme={darkTheme} themeChangeHandler={themeChangeHandler} />
                <Daocard darkTheme={darkTheme} themeChangeHandler={themeChangeHandler} />
            </div>
            <div className="flex space-x-8">
                <Daocard darkTheme={darkTheme} themeChangeHandler={themeChangeHandler} />
                <Daocard darkTheme={darkTheme} themeChangeHandler={themeChangeHandler} />
                <Daocard darkTheme={darkTheme} themeChangeHandler={themeChangeHandler} />
                <Daocard darkTheme={darkTheme} themeChangeHandler={themeChangeHandler} />
            </div>
            <div className="h-20 pb-12"></div>
        </div>
    )
}

export default Daolist