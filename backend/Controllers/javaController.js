const { exec } = require("child_process")
const asyncHandler = require('express-async-handler')
const fs = require("fs")
const path = require('path')
const { storeModel } = require("../Models/codeSchema")
const { questionModel, easyModel, mediumModel, hardModel } = require("../Models/questionSchema")

const dirPath = path.join(__dirname, '..')

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
  const { user_id, question_id, code } = req.body
  const { scope } = req.params
  const modelMap = {
    Basic: questionModel,
    Easy: easyModel,
    Medium: mediumModel,
    Hard: hardModel
  }
  const model = modelMap[scope]
  const question = await model.findById(question_id)
  const testCases = question.testcases

  let storedCode = await storeModel.findOne({ user_id })
  if (storedCode) {
    const questionIndex = storedCode.data.findIndex((q) => q.question_id === question_id)
    if (questionIndex !== -1) {
      storedCode.data[questionIndex].code = code
    }
    else {
      storedCode.data.push({ question_id, code })
    }
    await storedCode.save();
  } else {
    storedCode = await storeModel.create({
      user_id,
      data: {
        question_id,
        code
      }
    })
  }

  const filePath = path.join(__dirname, '..', "Main.java")
  fs.writeFileSync(filePath, code)
  const results = []
  for (const { input, expectedOutput } of testCases) {
    try {
      const result = await Main("Main", input)
      results.push({
        input,
        expectedOutput,
        passed: result === expectedOutput,
        result: result,
      })
    } catch (err) {
      return res.status(400).json({ error: err.details })
    }
  }
  res.status(201).json({ testResults: results, storedCode })
  fs.unlink(filePath, (err) => {
    if (err) console.error(`Error deleting file: ${filePath}`, err);
  })
  const classfilePath = path.join(__dirname, '..', "Main.class")
  fs.unlink(classfilePath, (err) => {
    if (err) console.error(`Error deleting file: ${classfilePath}`, err);
  })
})

module.exports = { run }