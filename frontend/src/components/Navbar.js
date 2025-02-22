import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { QuestionContext } from "../Context/QuestionContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const { setScope } = useContext(QuestionContext);
    const { user, logout } = useContext(AuthContext);
    const [dropdown, setDropdown] = useState(false);
    const [profile, setProfile] = useState(false);
    const dropdownref = useRef();
    const dropdownbuttonref = useRef();

    const handleClickOutside = useCallback((e) => {
        if (dropdownref.current && !dropdownref.current.contains(e.target) && !dropdownbuttonref.current.contains(e.target)) {
            setDropdown(false);
        }
    }, []);

    useEffect(() => {
        if (dropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdown, handleClickOutside]);

    function handleLevel(level) {
        setScope(level);
        navigate('/questions');
    }

    return (
        <div className="flex w-full p-1 bg-green-500 h-[50px] fixed z-10">
            <h1 className="ml-10 mr-20 font-bold pt-1.5 text-2xl">Code Efficiency Analyzer</h1>
            <div className="w-2/3 flex justify-between">
                <ul className="flex">
                    <li className="mr-5">
                        <button onClick={() => handleLevel("Basic")} className="text-xl difficulty">Home</button>
                    </li>
                    <li className="mr-5">
                        <button onClick={() => handleLevel("Easy")} className="text-xl difficulty">Easy</button>
                    </li>
                    <li className="mr-5">
                        <button onClick={() => handleLevel("Medium")} className="text-xl difficulty">Medium</button>
                    </li>
                    <li className="mr-5">
                        <button onClick={() => handleLevel("Hard")} className="text-xl difficulty">Hard</button>
                    </li>
                </ul>
                <div
                    ref={dropdownbuttonref}
                    className="cursor-pointer mt-1.5 mr-2 h-[30px] w-[30px] rounded-full bg-red-500"
                    onClick={() => setDropdown((prev) => !prev)}
                >
                    <img src="/user-image.png" alt="logo" className="h-full w-full object-cover" />
                </div>
            </div>
            {dropdown && (
                <div ref={dropdownref} className="w-[170px] text-white fixed right-0 top-14 bg-gray-800 z-20">
                    <div className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => setProfile(true)}>My profile</div>
                    <div className="p-2 hover:bg-gray-700 cursor-pointer">Settings</div>
                    <div className="p-2 hover:bg-gray-700 cursor-pointer" onClick={logout}>Logout</div>
                </div>
            )}
            {profile && (
                <div className="w-[500px] h-[400px] bg-black fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border-2 border-green-500 flex flex-col text-white">
                    <h1 className="mt-5 ml-5 text-2xl font-bold text-green-400">My Profile</h1>
                    <div className="flex flex-col items-center">
                        <div className="cursor-pointer mt-1.5 mr-2 h-[60px] w-[60px] rounded-full bg-red-500">
                            <img src="/user-image.png" alt="logo" className="h-full w-full object-cover" />
                        </div>
                        <p className="mt-2 cursor-pointer text-[10px]">Change profile</p>
                    </div>
                    <div className="flex mt-5 ml-5">
                        <div>Name</div>
                        <div className="ml-28 p-2 border-none outline-none bg-white text-black rounded w-[250px]">{user.name}</div>
                    </div>
                    <div className="flex mt-5 ml-5">
                        <div>Email</div>
                        <div className="ml-28 p-2 border-none outline-none bg-white text-black rounded w-[250px]">{user.email}</div>
                    </div>
                    <div className="flex mt-5 ml-5">
                        <div>Problems Solved</div>
                        <div className="ml-8 p-2 border-none outline-none bg-white text-black rounded w-[250px]">{user.solved}</div>
                    </div>
                    <div onClick={() => setProfile(false)} className="text-3xl cursor-pointer absolute right-2">&times;</div>
                </div>
            )}
        </div>
    );
}

export default Navbar;