import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup(){
    useEffect(()=>{
        document.body.style.backgroundColor='rgb(20, 19, 19)';
        return ()=>{
          document.body.style.backgroundColor='';
        }
    },[])

    const navigate=useNavigate()

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [code,setCode]=useState("")
    const [password,setPassword]=useState("");
    const [error,setError]=useState("")
    const [vcbtn,setVcbtn]=useState(true)
    const [verify,setVerify]=useState("")

    const postData={
      name,
      email,
      password,
      code,
      verify
    }

    function handleVerification(){
       setVcbtn(false)
       axios.post("http://localhost:3500/send-otp",{email})
       .then((response)=>{
           setVerify(response.data.message)
       })
       .catch((err)=>{
            if(err.response){
              setError(err.response.data.message)
            }
       })
    }

    function handleSubmit(e){
      e.preventDefault();
      axios.post("http://localhost:3500/register",postData)
      .then((response)=>{
            navigate('/login')
      })
      .catch((err)=>{
        if(err.response){
          setError(err.response.data.message)
        }
      })
    }

    return <>
       <form className="mt-10 w-[310px] h-full sbc" onSubmit={handleSubmit}>
        <div className="text-center">
          <p className="text-white text-4xl">Sign up to start coding</p>
        </div>

        {error && <p className="mt-10 text-red-500">{error}*</p>}
        <div className={`${(error)?"":"mt-10"}`}>
            <div className="inp">
                <label htmlFor="name">UserName</label>
                <input type="text" id="name" className="inpbox" onChange={(e)=>{setName(e.target.value)}}></input>
            </div>
            
            <div className="mt-3 text-white">
                <label htmlFor="email">Email</label>
            </div>
            <div className="text-white flex w-full">
                <div className="w-4/5">
                    <input type="email" id="email" className="w-full inpbox" onChange={(e)=>{setEmail(e.target.value)}}></input>
                </div>
                <div className="ml-2 flex flex-col w-1/5">
                  {(vcbtn===true)?<input type="button" value="Verify" onClick={handleVerification} className="mt-2 inpbox text-xs"></input>
                  :<input type="text" placeholder="code" className="inpbox" value={code} onChange={(e)=>{setCode(e.target.value)}}></input>}
                </div>
            </div>

            <div className="inp">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="inpbox" onChange={(e)=>{setPassword(e.target.value)}}></input>
            </div>
        </div>

        <div>
          <button type="submit" className="mt-10 p-2 w-full h-12 rounded-3xl font-bold text-center bg-green-500">Register</button>
        </div>

        <div className="sfooter">
          <p>Already have an account?<Link to='/login' className="text-white underline pl-1">Log in here.</Link></p>
        </div>
       </form>
    </>
}