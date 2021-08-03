const express = require('express')
const app = express();
const path = require('path')

app.use(express.json());

//Student data
const students = ['Jimmy', 'Timothy', 'Jimothy']

//endpoints
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})


app.post('/api/students', (req, res)  => {
    let {name} = req.body;
    
    const index = students.findIndex((student) => {
        return student === name
    })

    try {
        if (index === -1 && name !== "") {
          students.push(name);
          res.status(200).send(students);
        } else if (name === "") {
          res.status(400).send("must provide a name");
        } else {
          res.status(400).send("that student already exists");
        }
      } catch (err) {
        // do something
      }
})

const port = process.env.PORT || 5050;


app.listen(port, function (){
    console.log(`Server running on ${port}`)
})