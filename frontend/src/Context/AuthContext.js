import axios from "axios"
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [isAuthReady, setIsAuthReady] = useState(false)

    useEffect(() => {
        if (token) {
            const storedtoken = localStorage.getItem("token")
            if (storedtoken) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${storedtoken}`
            }
            else {
                delete axios.defaults.headers.common["Authorization"]
            }
            setIsAuthReady(true)
        }
    }, [token])

    function logout() {
        setToken(null)
        localStorage.removeItem("token")
    }


    return <AuthContext.Provider value={{ token, setToken, isAuthReady, logout }}>
        {children}
    </AuthContext.Provider>
}

export { AuthContext }