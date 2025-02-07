import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext";

export default function Question(){
    const navigate=useNavigate()
    const location=useLocation()
    const [questions,setQuestions]=useState([])
    const [scope,setScope]=useState("")
    const [activeButton, setActiveButton] = useState("")
    const {isAuthenticated} =useAuth()

    useEffect(()=>{
        document.body.style.backgroundColor='rgb(20, 19, 19)';
        return ()=>{
            document.body.style.backgroundColor='';
        }
    },[isAuthenticated,navigate])

    useEffect(() => {
        if(isAuthenticated){
          if(!location.pathname.includes("/questions")){
            navigate("/questions");
          }
        }
      },[isAuthenticated, location.pathname, navigate]);

    useEffect(()=>{
        if(scope){
            axios.get(`http://localhost:3500/${scope}`)
            .then((response)=>{
                setQuestions(response.data)
                window.scrollTo({top:0,behavior:"smooth"})
            })
            .catch((err)=>{
                console.error(err)
            })
        }
    },[scope])

    useEffect(() => {
        const path = location.pathname;
        if(path === "/questions"){
          setScope("questions");
          setActiveButton("question");
        }
        else if(path.startsWith("/questions/easy")){
          setScope("questions/easy");
          setActiveButton("easy");
        }
        else if (path.startsWith("/questions/medium")){
          setScope("questions/medium");
          setActiveButton("medium");
        }
        else if(path.startsWith("/questions/hard")){
          setScope("questions/hard");
          setActiveButton("hard");
        }
      },[location.pathname]);

    function handleDifficulty(difficulty){
        if(difficulty==="question"){
            navigate('/questions')
        }
        else{
            navigate(`/questions/${difficulty}`)
        }
    }

    function handleSolve(id,level){
        const url=(level==="question")?'/questions/editor':`/questions/${level}/editor`
        navigate(url,{
            state:{
                id,
                level,
            }
        })
    }

    return <>
        <div className="flex w-full p-1 bg-green-500 fixed z-50">
          <h1 className="pl-5 pr-10 font-bold pt-1.5">Code Efficiency Analyzer</h1>
            <ul className="flex">
            <li><button onClick={()=>{handleDifficulty("question")}} className={`difficulty ${(activeButton==="question")?"bg-white":""}`}>Home</button></li>
                <li><button onClick={()=>{handleDifficulty("easy")}} className={`difficulty ${(activeButton==="easy")?"bg-white":""}`}>Easy</button></li>
                <li><button onClick={()=>{handleDifficulty("medium")}} className={`difficulty ${(activeButton==="medium")?"bg-white":""}`}>Medium</button></li>
                <li><button onClick={()=>{handleDifficulty("hard")}} className={`difficulty ${(activeButton==="hard")?"bg-white":""}`}>Hard</button></li>
            </ul>
       </div>
      
       <div className="my-20 w-[1000px] min-h-screen flex flex-col items-center-center">
       {questions.map((question,index)=>(
            <div key={index} className="mt-5 px-10 w-full">
                <div className="bg-black w-full h-40 flex quesCard">
                    <div className="p-5 w-3/4">
                        <div className="text-xl text-white">{question.quesHead}</div>
                        <div className="pt-5 text-base text-white">{question.quesDesc}</div>
                    </div>
                    <div className="pt-[50px] w-1/4 relative">
                        <button type="button" onClick={()=>{handleSolve(question._id,activeButton)}} className="p-2 rounded absolute right-10 bg-green-500 text-white">Solve</button>
                    </div>
               </div>
            </div>
       ))}
       </div>

     </>
}