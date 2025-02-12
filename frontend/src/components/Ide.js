import Editor from '@monaco-editor/react'
import { useContext, useEffect, useState,useCallback } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { QuestionContext } from '../Context/QuestionContext'

export default function Ide() {
    const [question, setQuestion] = useState({})
    const [code, setCode] = useState("")
    const { id } = useParams()
    const { scope, setSolvedIds } = useContext(QuestionContext)

    useEffect(() => {
        axios.get(`http://localhost:3500/specific/${scope}/${id}`)
            .then((res) => (setQuestion(res.data[0])))
            .catch((e) => console.log(e))
    }, [id, scope])

    useEffect(() => {
        axios.post('http://localhost:3500/api/code',{id:question.id})
        .then((res)=>{
            if(res.data.message==="not found"){
                setCode(`

public class ${question.Name} {
    public static ${question.return} ${question.quesHead}(int n){
        // Enter your code here
    }
                        
                    
    public static void main(String[] args) {
        try {
            int n = Integer.parseInt(args[0]);
            System.out.print(${question.quesHead}(n)); 
        } catch (NumberFormatException e) {
            System.out.println("Invalid input. Please provide a valid integer.");
        }
    }
}`)
            }
            else{
                setCode(res.data.code)
            }
        })
        .catch((e)=>{console.log(e)})
 
    }, [question])

    const testCases = question.testcases
    const [output, setOutput] = useState([])
    const [error, setError] = useState("")

    const handleSolvedQuestion = useCallback(() => {
        const allTestCasesSolved = output.every((testCase) => testCase.passed === true)
        if (allTestCasesSolved) {
          setSolvedIds((prev) => {
            if (!prev.includes(question.id)) {
              return [...prev, question.id]
            }
            return prev
          });
        }
      }, [output, question.id,setSolvedIds])

      useEffect(() => {
        if (output.length >= 1) {
          handleSolvedQuestion()
        }
      }, [output, handleSolvedQuestion])

    function handleRun() {
        axios.post(`http://localhost:3500/run/${scope}/${id}`, { code, testCases, ques_id:question.id })
            .then((res) => {
                setOutput(res.data.testResults)
                setError("")
            })
            .catch((err) => {
                const errorMessage = err.response ? err.response.data.error : err.message
                setError(errorMessage)
            })
    }

    const handleEditorDidMount = (editor, monaco) => {
        const lastLine = editor.getModel().getLineCount();
        const lastColumn = editor.getModel().getLineMaxColumn(lastLine);
        editor.setPosition({ lineNumber: lastLine, column: lastColumn });
        editor.revealPosition({ lineNumber: lastLine, column: lastColumn });
        editor.focus();
    };

    return <>
        <Navbar />
        <div className='w-full flex my-12'>
            <div className='mx-5 mt-10 w-[30%] text-white'>
                <p>{question.quesHead}</p><br />
                <p>{question.quesDesc}</p><br />
            </div>
            <div className='mx-5 w-[70%] flex flex-col'>
                <Editor
                    height="80vh"
                    defaultLanguage="java"
                    theme="vs-dark"
                    value={code}
                    options={{
                        fontSize: 14,
                        minimap: { enabled: true },
                        wordWrap: 'on',
                        roundedSelection: true,
                        scrollBeyondLastLine: false,
                        smoothScrolling: true,
                        formatOnType: true,
                        formatOnPaste: true,
                        readOnly: false,
                        automaticLayout: true,
                        quickSuggestions: true,
                        folding: true,
                    }}
                    onMount={handleEditorDidMount}
                    onChange={(newvalue) => { setCode(newvalue) }}
                />
                <div className='mt-4 self-end'>
                    <button type="submit" className='w-26 mr-4 p-2 bg-green-500 rounded'>Run Code</button>
                    <button onClick={handleRun} type="submit" className='w-20 mr-4 p-2 bg-green-500 rounded'>Submit</button>
                </div>
                <div className='mt-10 min-h-[250px] border bg'>
                    {error ? (<p className='p-6 text-white text-2xl'>{error}</p>) : <><h1 className='ml-10 mt-10 text-white text-2xl'>TestCases</h1>
                        <div className='flex flex-col my-5'>
                            <ul className='grid grid-cols-4'>
                                {output.map((result, index) => (
                                    <li className='ml-20 text-white' key={index}>
                                        <p>Input {index + 1}</p>
                                        {result.passed ? <span className='text-green-500 text-xs'>Passed</span> : <span className='text-red-500 text-xs'>Failed</span>}
                                    </li>
                                ))}
                            </ul>
                        </div></>}
                </div>
            </div>
        </div>

    </>
}