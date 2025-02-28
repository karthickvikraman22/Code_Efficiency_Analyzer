import { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useParams, useLocation } from 'react-router-dom';
import { QuestionContext } from '../Context/QuestionContext';
import { AuthContext } from '../Context/AuthContext';
import TestResults from "../components/TestResults";
import CodeEditor from "../components/CodeEditor";
import QuestionDescription from '../components/QuestionDescription';
import { TbRefresh } from "react-icons/tb";
import { Tooltip } from 'react-tooltip';

export default function Ide() {
    const [question, setQuestion] = useState({});
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [isRestored, setIsRestored] = useState(false);

    const { id } = useParams();
    const location = useLocation();

    const { user, setUser, isAuthReady } = useContext(AuthContext);
    const { scope, setScope } = useContext(QuestionContext);

    const [output, setOutput] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const scopeFromURL = params.get("scope");

        if (scopeFromURL !== scope) {
            setScope(scopeFromURL);
        }

        if (!loading && isAuthReady) {
            axios.get(`http://localhost:3500/specific/${scopeFromURL}/${id}`)
                .then((res) => {
                    setQuestion(res.data[0]);
                    setLoading(true);
                })
                .catch((e) => console.log(e));
        }
    }, [location.search, scope, setScope, id, loading, isAuthReady]);

    useEffect(() => {
        if (loading && question._id && user.email) {
            axios.post('http://localhost:3500/api/code', { question_id: question._id, user_id: user.email })
                .then((res) => {
                    if (res.data.message === "not found") {
                        setCode(`
class Main {
    public static ${question.return} ${question.function}(int n){
        // Enter your code here
    }
        
    public static void main(String[] args) {
        try {
            int n = Integer.parseInt(args[0]);
            System.out.print(${question.function}(n)); 
        } catch (NumberFormatException e) {
            System.out.println("Invalid input. Please provide a valid integer.");
        }
    }
}`);
                    } else {
                        setCode(res.data.code);
                    }
                })
                .catch((e) => console.log(e));
        }
    }, [loading, question, user.email, isRestored]);

    const handleSolvedQuestion = useCallback(() => {
        const allTestCasesSolved = output.every((testCase) => testCase.passed === true);
        if (allTestCasesSolved) {
            axios.put(`http://localhost:3500/user/${user.email}/solve`)
                .then((res) => {
                    setUser((prev) => ({ ...prev, solved: res.data.solved }));
                })
                .catch((e) => console.log(e));
        }
    }, [output, setUser, user.email]);

    useEffect(() => {
        if (output.length >= 1) {
            handleSolvedQuestion();
        }
    }, [output, handleSolvedQuestion]);

    function handleRun() {
        setIsShow(true);
        axios.post(`http://localhost:3500/run/${scope}`, { code, user_id: user.email, question_id: question._id })
            .then((res) => {
                setOutput(res.data.testResults);
                setError("");
            })
            .catch((err) => {
                const errorMessage = err.response ? err.response.data.error : err.message;
                setError(errorMessage);
            });
    }

    function handleRestore() {
        axios.post("http://localhost:3500/api/restore", { user_id: user.email, question_id: question._id })
            .then(() => setIsRestored((prev => !prev)))
            .catch((e) => console.log(e))
    }

    const handleEditorDidMount = (editor) => {
        const lastLine = editor.getModel().getLineCount();
        const lastColumn = editor.getModel().getLineMaxColumn(lastLine);
        editor.setPosition({ lineNumber: lastLine, column: lastColumn });
        editor.revealPosition({ lineNumber: lastLine, column: lastColumn });
        editor.focus();
    };

    return (
        <div className="w-full flex flex-col max-h-screen overflow-hidden">
            <Navbar />
            <div className='pt-14 w-full text-right'>
                <span className="inline-flex cursor-pointer mr-5" onClick={handleRestore}><TbRefresh color='white' size={25} data-tooltip-variant="light" data-tooltip-content="Reset to default code" data-tooltip-id="icon-tooltip" /></span>
                <Tooltip id="icon-tooltip" delayHide={500} />
            </div>
            <div className='w-full flex'>
                <QuestionDescription question={question} />
                <div className="mr-5 mt-2 w-[65%] flex flex-col">
                    <CodeEditor
                        code={code}
                        onCodeChange={(newValue) => setCode(newValue)}
                        onEditorMount={handleEditorDidMount}
                    />
                    <div className='mt-4 self-end flex'>
                        <button onClick={handleRun} type="submit" className='w-20 mr-4 p-2 bg-green-500 rounded'>Run</button>
                        <button onClick={handleRun} type="submit" className='w-20 mr-4 p-2 bg-green-500 rounded'>Submit</button>
                    </div>
                    {isShow &&
                        <div className='w-[825px] fixed bottom-0 pr-5'>
                            <TestResults output={output} error={error} />
                            <div onClick={() => setIsShow(false)} className="text-3xl text-white cursor-pointer absolute top-0 right-5">&times;</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}