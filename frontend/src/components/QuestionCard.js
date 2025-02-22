import { useNavigate } from "react-router-dom";

export default function QuestionCard({ question, scope }) {
    const navigate = useNavigate();

    return (
        <div className="mt-5 px-10 w-full">
            <div className="bg-black w-full h-40 flex quesCard">
                <div className="p-5 w-3/4">
                    <div className="text-xl text-green-600">{question.quesHeading}</div>
                    <div className="pt-5 text-base text-white">{question.quesDesc}</div>
                </div>
                <div className="pt-[50px] w-1/4 relative">
                    <button
                        type="button"
                        onClick={() => navigate(`/questions/${question._id}?scope=${scope}`)}
                        className="p-2 rounded absolute right-10 bg-green-600 text-white"
                    >
                        Solve
                    </button>
                </div>
            </div>
        </div>
    );
}