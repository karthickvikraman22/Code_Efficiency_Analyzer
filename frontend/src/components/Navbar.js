import { useContext, useEffect, useRef, useState, useCallback } from "react"
import { QuestionContext } from "../Context/QuestionContext"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"

function Navbar() {
    const navigate = useNavigate()
    const { setScope } = useContext(QuestionContext)
    const { logout } =useContext(AuthContext)
    const [dropdown, setDropdown] = useState(false)
    const dropdownref=useRef()

    const find = useCallback((e) => {
        if(dropdownref.current && !dropdownref.current.contains(e.target)){
            setDropdown(false)
        }
    }, [])

    useEffect(()=>{
        if(dropdown){
            document.addEventListener('mousedown',find)
        }
        else{
            document.removeEventListener('mousedown',find)
        }

        return ()=>{
            document.removeEventListener('mousedown',find)
        }
    },[dropdown,find])

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
                <div className="cursor-pointer mt-1.5 mr-2 h-[30px] w-[30px] rounded-full bg-black" onClick={() => { setDropdown(prev=>!prev) }}></div>
            </div>
            {dropdown &&
                <div ref={dropdownref} className="w-[170px] text-white fixed right-0 top-14 bg-gray-800  z-20">
                    <div className="p-2 hover:bg-gray-700 cursor-pointer">My profile</div>
                    <div className="p-2 hover:bg-gray-700 cursor-pointer">Settings</div>
                    <div className="p-2 hover:bg-gray-700 cursor-pointer" onClick={logout}>Logout</div>
                </div>
            }
        </div>
    </>
}

export default Navbar