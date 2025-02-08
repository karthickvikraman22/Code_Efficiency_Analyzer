import { useContext } from "react"
import { QuestionContext } from "../Context/QuestionContext"
import { useNavigate } from "react-router-dom"

function Navbar() {
    const navigate=useNavigate()
    const { setScope } = useContext(QuestionContext)
    function handleLevel(level) {
        setScope(level)
        navigate('/questions')
    }
    return <>
        <div className="flex w-full p-1 bg-green-500 h-[50px] fixed z-10">
            <h1 className="ml-10 mr-20 font-bold pt-1.5 text-2xl">Code Efficiency Analyzer</h1>
            <div className="w-2/3 flex justify-between">
                <ul className="flex">
                    <li className="mr-5"><button onClick={() => { handleLevel("Basic") }} className="text-xl difficulty">Home</button></li>
                    <li className="mr-5"><button onClick={() => { handleLevel("Easy") }} className="text-xl difficulty">Easy</button></li>
                    <li className="mr-5"><button onClick={() => { handleLevel("Medium") }} className="text-xl difficulty">Medium</button></li>
                    <li className="mr-5"><button onClick={() => { handleLevel("Hard") }} className="text-xl difficulty">Hard</button></li>
                </ul>
                <div className="mt-1.5 mr-10 h-[30px] w-[30px] rounded-full bg-black"></div>
            </div>
        </div>
    </>
}

export default Navbar