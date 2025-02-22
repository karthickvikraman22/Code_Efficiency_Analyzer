import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const QuestionContext = createContext();

export default function QuestionProvider({ children }) {
    const [questions, setQuestions] = useState([]);
    const [scope, setScope] = useState("Basic");
    const { token, isAuthReady, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [fetchedScope, setFetchedScope] = useState(null);

    useEffect(() => {
        if (token && isAuthReady && fetchedScope !== scope) {
            setFetchedScope(scope)
            axios.get(`http://localhost:3500/${scope}`)
                .then((res) => {
                    setQuestions(res.data);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                })
                .catch((error) => {
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        navigate('/login');
                    } else {
                        console.log("Error:", error.response?.data?.message);
                    }
                });
        }
    }, [scope, navigate, token, isAuthReady, user.email, fetchedScope]);

    return (
        <QuestionContext.Provider value={{ questions, scope, setScope }}>
            {children}
        </QuestionContext.Provider>
    );
}

export { QuestionContext };