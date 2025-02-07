import Editor from '@monaco-editor/react'
import { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Ide(){
    const [question,setQuestion]=useState({})
    const location=useLocation()
    const {id,level} =location.state
    const [code, setCode] = useState("");

    useEffect(()=>{
        axios.get(`http://localhost:3500/questions/${level}/${id}`)
        .then((response)=>{
            setQuestion(response.data)
        })
        .catch((err)=>{
           console.error(err)
        })

        document.body.style.backgroundColor='rgb(20, 19, 19)';
        return ()=>{
            document.body.style.backgroundColor='';
        }
    },[id,level])

    useEffect(()=>{
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
    },[question])
   
    const testCases=question.testcases
    const [output,setOutput]=useState([])
    const [error,setError]=useState("")

    function handleRun(){
        axios.post(`http://localhost:3500/run/${id}`,{code,testCases})
        .then((res)=>{
            setOutput(res.data.testResults);
            setError("")
        })
        .catch((err)=>{
            console.log(err.response.data)
            const errorMessage = err.response ? err.response.data.error : err.message;
            setError(errorMessage);
        })
    }
   
    const handleEditorDidMount = (editor, monaco) => {
        const lastLine = editor.getModel().getLineCount(); 
        const lastColumn = editor.getModel().getLineMaxColumn(lastLine); 
        editor.setPosition({ lineNumber: lastLine, column: lastColumn }); 
        editor.revealPosition({ lineNumber: lastLine, column: lastColumn }); 
        editor.focus(); 
      };

    return<>
       <div className="flex w-full p-2 bg-green-500 fixed z-50">
          <h1 className="pl-5 pr-10 font-bold">Code Efficiency Analyzer</h1>
       </div>

       <div className='w-full flex my-12'>
            <div className='mx-5 mt-10 w-[30%] text-white'>
                 <p>{question.quesHead}</p><br/>
                 <p>{question.quesDesc}</p><br/>
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
                        roundedSelection:true,
                        scrollBeyondLastLine: false,
                        smoothScrolling: true,
                        formatOnType:true,
                        formatOnPaste:true,
                        readOnly: false,
                        automaticLayout: true,
                        quickSuggestions: true,
                        folding: true,
                    }}
                    onMount={handleEditorDidMount}
                    onChange={(newvalue)=>{setCode(newvalue)}}
                />
                <div className='mt-4 self-end'>
                  <button type="submit" className='w-26 mr-4 p-2 bg-green-500 rounded'>Run Code</button>
                  <button onClick={handleRun} type="submit" className='w-20 mr-4 p-2 bg-green-500 rounded'>Submit</button>
                </div>
                <div className='mt-10 min-h-[250px] border bg'>
                    {error?(<p className='p-6 text-white text-2xl'>{error}</p>):<><h1 className='ml-10 mt-10 text-white text-2xl'>TestCases</h1>
                    <div className='flex flex-col my-5'>
                    <ul className='grid grid-cols-4'>
                        {output.map((result, index) => (
                        <li className='ml-20 text-white' key={index}>
                            <p>Input {index + 1}</p>
                            {result.passed ? <span className='text-green-500 text-xs'>Passed</span>:<span className='text-red-500 text-xs'>Failed</span>}
                        </li>
                        ))}
                    </ul>
                    </div></>}
                </div>
            </div>
       </div>
       
    </>
}