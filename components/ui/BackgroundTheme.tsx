
import { createContext, useContext, useState } from "react";

interface Theme {
    bgColor: string,
    fontColor: string,
    transition?: string,
    text?: string
}

const ThemeContext = createContext<{ theme: Theme; setTheme: React.Dispatch<React.SetStateAction<Theme>> } | null>(null);

export function ThemeProvider({children}: {children: React.ReactNode}) {
    const [theme, setTheme] = useState<Theme>({bgColor: "white", fontColor: "black", text: "Dark Mode"});
    

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(){
    const context = useContext(ThemeContext);

    if(!context) throw new Error("useTheme error!");
    return context;
}

