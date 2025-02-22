import React from "react";

export default function TestResults({ output, error }) {
    return (
        <div className="min-h-[250px] border-t-[1px] bg">
            {error ? (
                <p className="p-6 text-white text-2xl">{error}</p>
            ) : (
                <>
                    <h1 className="ml-10 mt-10 text-white text-2xl">Test Cases</h1>
                    <div className="flex flex-col my-5">
                        <ul className="grid grid-cols-4">
                            {output.map((result, index) => (
                                <li className="ml-20 text-white" key={index}>
                                    <p>Input {index + 1}</p>
                                    {result.passed ? (
                                        <span className="text-green-500 text-xs">Passed</span>
                                    ) : (
                                        <span className="text-red-500 text-xs">Failed</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}