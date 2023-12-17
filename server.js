const express = require('express');
const pdfParse = require('pdf-parse');
const fileUpload = require('express-fileupload'); 
const app = express();
const cors = require('cors');
const port = 3001; // Use a different port from your React app

const OpenAIApi = require("openai");


const openai = new OpenAIApi({
  apiKey: 'PASTE YOU API KEY HERE',
});  

app.use(express.json());
app.use(fileUpload());
app.use(cors());

app.post('/handle-file-message', async (req, res) => {
  pdfParse(req.files.pdfFile).then(async (result) => {
    const completion = await openai.chat.completions.create({
      messages: [{role: 'system', content: 'you are the teacher. You will become' +
      'assignments from students. return ONLY the overall grade in a scale from 1 to 12'+
      'you can also leave the comments after that grade about whether your student is good or bad, but take in mind that the student will see this' +
      'ALSO, If there are mistakes, and the grade is below 10, you will need to come up with FIVE additional tasks and ALSO return them'+
      'use the double enter separator between grade, comments and additional tasks'},
      { role: "user", content: result.text}],
      model: "gpt-3.5-turbo",
    });

    await res.send(completion.choices[0].message.content);
  }).catch(error => {
    res.status(400)
    res.end()
  })

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});