import React from "react";

export default function QuestionDescription({ question }) {
    return (
        <div className='scrollable ml-5 mt-10 w-[35%] text-black bg-green-500 rounded-sm'>
            <p className='mx-3 mt-5 font-extrabold text-2xl wh-col'>{question.quesHeading}</p><br />
            <p className='mx-3 text-black'>{question.quesDesc}</p><br />
            {
                question.testcases?.map((testcase, index) => (
                    <div key={index} className='mt-5 mx-3'>
                        <p className='text-xl font-bold'>Example {index + 1}</p>
                        <div className='mt-2 font-medium'>
                            <p className='text-black'>Input: <span className='wh-col'>{Array.isArray(testcase.input) || (typeof testcase.input == "object") ? JSON.stringify(testcase.input) : testcase.input}</span></p>
                            <p className='text-black'>Output: <span className='wh-col'>{testcase.expectedOutput}</span></p>
                        </div>
                    </div>
                ))
            }
            <div className="ml-3 my-5">
                <p className='text-xl font-bold'>Constraints</p>
                {question.constraints?.map((constraint, index) => (<div key={index}>{constraint}</div>))}
            </div>
        </div>
    );
}