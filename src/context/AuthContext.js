
import { createContext } from "react";

export const AuthContext = createContext()

export default function AuthProvider({ children, value }) {
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}