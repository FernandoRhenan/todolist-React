
import { createContext } from "react";

export const ColorContext = createContext()

export default function ColorProvider({ children, value }) {
    return (
        <ColorContext.Provider value={value}>
            {children}
        </ColorContext.Provider>
    )
}