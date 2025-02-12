import axios from "axios"
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token")|| null)
    const [isAuthReady, setIsAuthReady] = useState(false)
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user")
        return storedUser ? JSON.parse(storedUser) : { name: "", email: "" }
    })
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
        return ()=>{
            delete axios.defaults.headers.common["Authorization"]
        }
    }, [token])

    function logout() {
        setToken(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }


    return <AuthContext.Provider value={{ token, setToken, isAuthReady, logout, user, setUser }}>
        {children}
    </AuthContext.Provider>
}

export { AuthContext }