import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
    useEffect(()=>{
        document.body.style.backgroundColor='rgb(20, 19, 19)';
        return ()=>{
          document.body.style.backgroundColor='';
        }
    },[])
    const navigate=useNavigate()

    return <>
       <div className="flex w-full p-1 bg-green-500 fixed">
          <h1 className="pl-5 pr-10 font-bold pt-1.5">Code Efficiency Analyzer</h1>
            <ul className="flex">
                <li><button onClick={()=>{navigate('/register')}} className="px-3 py-2 hover:bg-green-400 rounded transition">Sign up</button></li>
                <li><button onClick={()=>{navigate('/login')}} className="px-3 py-2 hover:bg-green-400 rounded transition">Login</button></li>
            </ul>
       </div>

       <div className="mt-28 w-[700px]">
            <div className="text-center">
                <p className="text-white text-7xl">Skills speak louder than words</p>
                <p className="text-white pt-10">We help companies develop the strongest tech teams around. We help candidates sharpen their tech skills and pursue job opportunities.</p>
            </div>
       </div>
       
    </>
}