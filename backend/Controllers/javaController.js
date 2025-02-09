const { exec } = require("child_process")
const asyncHandler = require('express-async-handler')
const fs = require("fs")
const path = require('path');
const { questionModel,easyModel,mediumModel,hardModel } = require("../Models/questionSchema");
const { console } = require("inspector");

const dirPath = path.join(__dirname, '..', 'Allcodes');

function Main(Name, input) {
  return new Promise((resolve, reject) => {
    const fp = path.join(dirPath, `${Name}.java`)
    exec(`javac ${fp} && java -cp ${dirPath} ${Name} ${input}`, (error, stdout, stderr) => {
      if (error) {
        const formattedError = stderr
          .replace(new RegExp(dirPath, 'g'), '') 
          .replace(/\\/g, '/')
          .replace(/.*\.java:/, 'java:') 
          .trim();
        reject({ details: formattedError })
      } else {
        resolve(stdout.trim())
      }
    })
  })
}

const run = asyncHandler(async (req, res) => {
  const { code, testCases } = req.body
  const { scope, id } = req.params
  const modelMap = {
    Basic: questionModel,
    Easy: easyModel,
    Medium: mediumModel,
    Hard: hardModel
  }
  const model = modelMap[scope]
  const ques = await model.findById(id);
  const filePath = path.join(__dirname, '..', 'Allcodes', `${ques.Name}.java`);
  fs.writeFileSync(filePath, code)
  const results = []
  for (const { input, expectedOutput } of testCases) {
    try {
      const result = await Main(ques.Name, input);
      results.push({
        input,
        expectedOutput,
        passed: result === expectedOutput,
        result: result,
      });
    } catch (err) {
      console.log(err)
      return res.status(400).json({ error: err.details })
    }
  }
  res.status(201).json({ testResults: results })
})

module.exports = { run }