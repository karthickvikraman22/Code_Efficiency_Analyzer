import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { QuestionContext } from "../Context/QuestionContext"
import Navbar from "../components/Navbar"

export default function Question() {
    const { questions, scope } = useContext(QuestionContext)
    const navigate=useNavigate()

    return <>
        <Navbar />
        <div className="flex flex-col">
            <h1 className="ml-10 mt-20 md-0 text-white font-bold text-2xl">{scope} Questions</h1>
            <div className="my-5 w-[1000px] min-h-screen flex flex-col items-center">
                {questions.map((question, index) => (
                    <div key={index} className="mt-5 px-10 w-full">
                        <div className="bg-black w-full h-40 flex quesCard">
                            <div className="p-5 w-3/4">
                                <div className="text-xl text-green-600">{question.quesHead}</div>
                                <div className="pt-5 text-base text-white">{question.quesDesc}</div>
                            </div>
                            <div className="pt-[50px] w-1/4 relative">
                                <button type="button" onClick={() => {navigate(`/questions/${question.id}`)}} className="p-2 rounded absolute right-10 bg-green-600 text-white">Solve</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
}