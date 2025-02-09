import axios from "axios";
import { createContext, useEffect, useState } from "react";

const QuestionContext=createContext();

export default function QuestionProvider({children}){
    const [questions,setQuestions]=useState([])
    const[scope,setScope]=useState("Basic")

    useEffect(()=>{
        axios.get(`http://localhost:3500/${scope}`)
        .then((res)=>{setQuestions(res.data); window.scrollTo({top:0,behavior:"smooth"})})
        .catch((e)=>(console.log(e)))
    },[scope])

    return<>
         <QuestionContext.Provider value={{questions,scope,setScope}}>
            {children}
         </QuestionContext.Provider>
    </>
}

export {QuestionContext}