import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { useNavigate,useLocation } from "react-router-dom"

const QuestionContext=createContext()

export default function QuestionProvider({children}){
    const [questions,setQuestions]=useState([])
    const [solvedIds,setSolvedIds]=useState(()=>{
        const storedIds=localStorage.getItem("Ids")
        return storedIds?JSON.parse(storedIds):[]
    })
    const[scope,setScope]=useState("Basic")
    const {token,isAuthReady} =useContext(AuthContext)
    const navigate=useNavigate()
    const location=useLocation()

    useEffect(()=>{
        const publicPages = ["/login", "/register"]
        if(token && isAuthReady){
            axios.get(`http://localhost:3500/${scope}`)
            .then((res)=>{setQuestions(res.data); window.scrollTo({top:0,behavior:"smooth"})})
            .catch((error)=>{
                if (error.response) {
                    if (error.response.status === 401 || error.response.status === 403){
                        navigate('/login')
                    }else {
                        console.log("Error:", error.response.data.message)
                    }
                }
            })
        }
        else if(!token && !publicPages.includes(location.pathname)){
            navigate('/login')
        }
    },[scope,navigate,token,isAuthReady,location.pathname])

    useEffect(()=>{
       localStorage.setItem("Ids",JSON.stringify(solvedIds))
    },[solvedIds])

    return<>
         <QuestionContext.Provider value={{questions,scope,setScope,solvedIds,setSolvedIds}}>
            {children}
         </QuestionContext.Provider>
    </>
}

export {QuestionContext}