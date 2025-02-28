import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import { AiFillLike } from "react-icons/ai";
import { IoIosShareAlt, IoMdCopy } from "react-icons/io";
import { AuthContext } from "../Context/AuthContext";
import { QuestionContext } from "../Context/QuestionContext";
import axios from "axios";
import { EmailShareButton, EmailIcon, WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon } from 'react-share';

export default function QuestionDescription({ question }) {
    const { user, setUser } = useContext(AuthContext);
    const { scope } = useContext(QuestionContext);
    const [isShare, setIsShare] = useState(false);
    const [color, setColor] = useState("black");
    const shareUrl = window.location.href;
    const shareRef = useRef();
    const shareButtonRef = useRef();

    useEffect(() => {
        if (user.email) {
            const isfound = user.liked.findIndex((ques) => ques.questionId === question._id);
            if (isfound !== -1) {
                setColor("#15803d");
            }
        }
    }, [user.liked, question._id, user.email]);

    function handleLike() {
        axios.post("http://localhost:3500/api/like", { id: question._id, user_id: user.email, scope, color, questionName: question.quesHeading })
            .then((res) => {
                setColor(res.data.color);
                if (res.data.color === "#15803d") {
                    setUser((user) => {
                        return {
                            ...user,
                            liked: [...user.liked, question._id]
                        };
                    })
                }
            })
            .catch((e) => console.error(e))
    }

    const handleClickOutside = useCallback((e) => {
        if (shareRef.current && !shareRef.current.contains(e.target) && !shareButtonRef.current.contains(e.target)) {
            setIsShare(false);
        }
    }, []);

    useEffect(() => {
        if (isShare) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isShare, handleClickOutside]);

    function handleCopy() {
        navigator.clipboard.writeText(shareUrl)
            .catch((err) => console.error("Failed to copy:", err));
    }

    return (
        <div className="ml-5 w-[35%] mt-2 text-black bg-green-500 rounded-sm h-[500px] relative">
            <div className="scrollable">
                <p className="mx-3 mt-5 font-extrabold text-2xl wh-col">{question.quesHeading}</p>
                <br />
                <p className="mx-3 text-black">{question.quesDesc}</p>
                <br />
                {question.testcases?.map((testcase, index) => (
                    <div key={index} className="mt-5 mx-3">
                        <p className="text-xl font-bold">Example {index + 1}</p>
                        <div className="mt-2 font-medium">
                            <div className="text-black">
                                Input:
                                <span className="wh-col">
                                    {testcase.input.map((inp, index) => (
                                        <div key={index}>
                                            {Array.isArray(inp) ? JSON.stringify(inp) : typeof inp === "string" ? `"${inp}"` : inp}
                                        </div>
                                    ))}
                                </span>
                            </div>
                            <div className="text-black">
                                Output: <span className="wh-col">{testcase.expectedOutput}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="ml-3 my-5">
                    <p className="text-xl font-bold">Constraints</p>
                    {question.constraints?.map((constraint, index) => (
                        <div key={index}>{constraint}</div>
                    ))}
                </div>
            </div>
            <div className="w-full flex absolute left-0 bottom-0 bg-slate-300 p-1 rounded-bl rounded-br">
                <div className="ml-3 cursor-pointer" onClick={handleLike}>
                    <AiFillLike size={30} color={color} />
                </div>
                <div ref={shareButtonRef} className="ml-8 cursor-pointer" onClick={() => setIsShare((prev) => !prev)}>
                    <IoIosShareAlt size={30} />
                </div>
            </div>
            {isShare &&
                <div ref={shareRef} className="absolute w-[300px] h-[110px] left-20 bottom-[38px] grid grid-cols-3 items-center bg-black rounded-t">
                    <EmailShareButton url={shareUrl}><EmailIcon size={30} round={true} /></EmailShareButton>
                    <TelegramShareButton url={shareUrl}><TelegramIcon size={30} round={true} /></TelegramShareButton>
                    <WhatsappShareButton url={shareUrl}><WhatsappIcon size={30} round={true} /></WhatsappShareButton>
                    <button onClick={handleCopy} className="w-fit ml-5 pd-5">
                        <IoMdCopy size={30} color="white" />
                    </button>
                </div>
            }
        </div>
    );
}