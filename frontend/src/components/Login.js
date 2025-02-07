import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from "./AuthContext";

export default function Login(){
    const navigate=useNavigate()
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("")
    const postData={
        email,
        password,
    }
    const {login,isAuthenticated} =useAuth()

    useEffect(()=>{
        document.body.style.backgroundColor='rgb(51, 49, 49)';
        return ()=>{
          document.body.style.backgroundColor='';
        }
    },[])

    useEffect(()=>{
        if (isAuthenticated) {
          navigate('/questions');
        }
    },[isAuthenticated,navigate]); 

    function handleSubmit(e){
        e.preventDefault()
            axios.post("http://localhost:3500/login",postData)
            .then((response)=>{
                console.log(response.data)
                localStorage.setItem('token',response.data.token)
                login()
            })
            .catch((err)=>{
                if(err.response){
                    setError(err.response.data.message)
                }
            })
    }

    return <>
       <div className="bg-black w-[500px] h-screen flex justify-center my-10 rounded">
        <form className="mt-10 w-[310px]" onSubmit={handleSubmit} >
            <div className="text-center">
                <p className="text-white text-4xl">Log in to CEA</p>
            </div>
            {<p className="mt-10 text-red-500">{error}</p>}
            <div className={`${(error)?"":"mt-10"}`}>
                <div className="inp">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="inpbox" onChange={(e)=>{setEmail(e.target.value)}}></input>
                </div>

                <div className="inp">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="inpbox" onChange={(e)=>{setPassword(e.target.value)}}></input>
                </div>
            </div>

            <div>
                <button type="submit" className="mt-10 p-2 w-full h-12 rounded-3xl font-bold text-center bg-green-500">Log In</button>
            </div>

            <div className="sfooter">
                <p>Don't have an account?<a href="/" className="text-white underline pl-1">Sign up for CEA.</a></p>
            </div>
        </form>
       </div>
       
    </>
}