import { useContext } from "react";
import { QuestionContext } from "../Context/QuestionContext";
import Navbar from "../components/Navbar";
import QuestionCard from "../components/QuestionCard";
import Footer from "../components/Footer";

export default function Question() {
    const { questions, scope } = useContext(QuestionContext);

    return (
        <>
            <Navbar />
            <div className="w-full flex flex-col items-center">
                <h1 className="ml-10 mt-20 md-0 text-white font-bold text-2xl">{scope} Questions</h1>
                <div className="my-5 w-[1000px] min-h-screen flex flex-col">
                    {questions.map((question, index) => (
                        <QuestionCard key={index} question={question} scope={scope} />
                    ))}
                </div>
                <Footer />
            </div>
        </>
    );
}