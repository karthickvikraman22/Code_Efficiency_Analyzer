import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full items-center">
            <div className="flex w-full p-1 bg-green-500 fixed">
                <h1 className="ml-5 mr-10 font-bold pt-1.5">Code Efficiency Analyzer</h1>
                <button onClick={() => navigate('/register')} className="px-3 py-2 hover:bg-green-400 rounded transition">Sign up</button>
                <button onClick={() => navigate('/login')} className="px-3 py-2 hover:bg-green-400 rounded transition">Login</button>
            </div>

            <div className="mt-28 w-[700px] flex justify-center">
                <div className="text-center">
                    <p className="text-white text-7xl">Skills speak louder than words</p>
                    <p className="text-white pt-10">We help companies develop the strongest tech teams around. We help candidates sharpen their tech skills and pursue job opportunities.</p>
                </div>
            </div>
        </div>
    );
}