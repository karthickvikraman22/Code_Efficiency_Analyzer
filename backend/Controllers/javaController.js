const { exec } = require("child_process")
const asyncHandler =require('express-async-handler')
const fs = require("fs")
const path=require('path');
const { questionModel } = require("../Models/questionSchema");

const dirPath = path.join(__dirname, '..', 'Allcodes'); 

function Main(Name,input){
  return new Promise((resolve,reject)=>{
    const fp=path.join(dirPath,`${Name}.java`)
    exec(`javac ${fp} && java -cp ${dirPath} ${Name} ${input}`, (error, stdout, stderr) => {
      if (error) {
         reject({details: stderr})
      } else {
        resolve(stdout)
      }
  })
  })
}

const run=asyncHandler(async(req,res)=>{
    const {code,testCases}=req.body
    const {id} =req.params
    const ques=await questionModel.findOne({_id:id})
    const filePath = path.join(__dirname, '..', 'Allcodes', `${ques.Name}.java`);
    fs.writeFileSync(filePath,code)
    const results=[]
    for (const { input, expectedOutput } of testCases) {
      try{
      const result = await Main(ques.Name, input);
      results.push({
        input,
        expectedOutput,
        passed: result === expectedOutput,
        result: result,
      });
      }catch(err){
        return res.status(400).json({ error: err.details})
      }
    }
    res.status(201).json({testResults:results})
})

module.exports={run}