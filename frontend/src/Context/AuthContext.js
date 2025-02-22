import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [user, setUser] = useState({ name: "", email: localStorage.getItem("user") || null, solved: 0 });

    useEffect(() => {
        if (user.email) {
            axios.get(`http://localhost:3500/user/${user.email}/get`)
                .then((res) => {
                    setUser({
                        name: res.data.user.name,
                        email: res.data.user.email,
                        solved: res.data.user.solved
                    })
                })
                .catch((e) => console.log(e))
        }
    }, [user.email])

    const logout = useCallback(() => {
        setToken(null);
        setUser({ name: "", email: null, solved: 0 });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        const publicPages = ["/login", "/register", "/"];
        if (!publicPages.includes(location.pathname)) {
            navigate('/login');
        }
    }, [navigate,location.pathname])

    const login = useCallback((token, email) => {
        if (!localStorage.getItem("token") || !localStorage.getItem("user")) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", email);
        };
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setToken(token);
        setUser((prev) => ({ ...prev, email }));
    }, []);


    useEffect(() => {
        const handleStorageEvent = (event) => {
            if (event.key === "token" || event.key === "user") {
                logout();
            };
        };

        const storedToken = localStorage.getItem("token");
        const storedUserEmail = localStorage.getItem("user");
        if (!storedToken || !storedUserEmail) {
            logout();
        } else {
            login(storedToken, storedUserEmail);
        }
        setIsAuthReady(true);

        window.addEventListener("storage", handleStorageEvent);
        return () => window.removeEventListener("storage", handleStorageEvent);
    }, [logout, login]);

    return (
        <AuthContext.Provider value={{ token, setToken, isAuthReady, logout, user, setUser, login }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };