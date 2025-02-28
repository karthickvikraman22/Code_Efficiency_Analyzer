import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

export default function Signup() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        code: "",
        verify: ""
    });
    const [error, setError] = useState("");
    const [passwordView, setPasswordView] = useState(false);
    const [vcbtn, setVcbtn] = useState(true);

    function handleVerification() {
        setVcbtn(false);
        axios.post("http://localhost:3500/send-otp", { email: userDetails.email })
            .then((response) => {
                setUserDetails((prev) => ({ ...prev, verify: response.data.message }));
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.message);
                }
            });
    }

    function handleUserDetails(value, name) {
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    }

    function handlePassword() {
        setPasswordView(prev=>!prev);
        if(!passwordView){
            document.getElementById('password').type="text";
        }else{
            document.getElementById('password').type="password";
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:3500/register", userDetails)
            .then(() => {
                navigate('/login');
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.message);
                }
            });
    }

    return (
        <form className="mt-10 w-[310px] h-full" onSubmit={handleSubmit}>
            <div className="text-center">
                <p className="text-white text-4xl">Sign up to start coding</p>
            </div>

            {error && <p className="mt-10 text-red-500">{error}*</p>}
            <div className={`${error ? "" : "mt-10"}`}>
                <div className="inp">
                    <label htmlFor="name">UserName</label>
                    <input type="text" id="name" className="inpbox" onChange={(e) => handleUserDetails(e.target.value, "name")} />
                </div>

                <div className="mt-3 text-white">
                    <label htmlFor="email">Email</label>
                </div>
                <div className="text-white flex w-full">
                    <div className="w-4/5">
                        <input type="email" id="email" className="w-full inpbox" onChange={(e) => handleUserDetails(e.target.value, "email")} />
                    </div>
                    <div className="ml-2 flex flex-col w-1/5">
                        {vcbtn ? (
                            <input type="button" value="Verify" onClick={handleVerification} className="mt-2 inpbox text-xs" />
                        ) : (
                            <input type="text" placeholder="code" className="inpbox" value={userDetails.code} onChange={(e) => handleUserDetails(e.target.value, "code")} />
                        )}
                    </div>
                </div>

                <div className="inp relative">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="inpbox" onChange={(e) => handleUserDetails(e.target.value, "password")} />
                    {passwordView ?
                        <span className="absolute right-4 top-[62%]" onClick={handlePassword}><IoMdEye size={20} /></span> :
                        <span className="absolute right-4 top-[62%]" onClick={handlePassword}><IoMdEyeOff size={20} /></span>
                    }
                </div>
            </div>

            <div>
                <button type="submit" className="mt-10 p-2 w-full h-12 rounded-3xl font-bold text-center bg-green-500">Register</button>
            </div>

            <div className="sfooter">
                <p>Already have an account?<Link to='/login' className="text-white underline pl-1">Log in here.</Link></p>
            </div>
        </form>
    );
}