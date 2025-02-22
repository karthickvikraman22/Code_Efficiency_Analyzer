import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../Context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { token, login } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        document.body.style.backgroundColor = 'rgb(51, 49, 49)';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    function handleUserDetails(value, name) {
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:3500/login", userDetails)
            .then((response) => {
                const { token, user } = response.data;
                login(token, user.email);
                navigate("/questions");
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.message);
                }
            });
    }

    useEffect(() => {
        if (token) {
            navigate('/questions');
        }
    }, [token, navigate]);

    return (
        <div className="bg-black w-[500px] h-screen flex justify-center my-10 rounded">
            <form className="mt-10 w-[310px]" onSubmit={handleSubmit}>
                <div className="text-center">
                    <p className="text-white text-4xl">Log in to CEA</p>
                </div>
                {error && <p className="mt-10 text-red-500">{error}</p>}
                <div className={`${error ? "" : "mt-10"}`}>
                    <div className="inp">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="inpbox" onChange={(e) => handleUserDetails(e.target.value, "email")} />
                    </div>

                    <div className="inp">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="inpbox" onChange={(e) => handleUserDetails(e.target.value, "password")} />
                    </div>
                </div>

                <div>
                    <button type="submit" className="mt-10 p-2 w-full h-12 rounded-3xl font-bold text-center bg-green-500">Log In</button>
                </div>

                <div className="sfooter">
                    <p>Don't have an account?<Link to="/register" className="text-white underline pl-1">Sign up for CEA.</Link></p>
                </div>
            </form>
        </div>
    );
}