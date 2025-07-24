//URL -> http://localhost:8383

const express = require('express');
const app = express()
const PORT = 8383

let data = ['James']

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    console.log('I hit an endpoint', req.method)
    res.send(`
        <body style="background: pink">
          <p>${JSON.stringify(data)}</p>
          <form action="http://localhost:8383/api/data" method="POST">
            <input type="text" name="name" placeholder="Enter your name">
            <button type="submit">Submit</button>
          </form>
        </body>
      `)
})

app.get('/dashboard', (req, res) => {
  console.log(`Now i hit the dashboard endpoint`)
  res.send(`
      <body>
        <h1> dashboard </h1>
        <a href='/'>Home</a>
      </body>      
      `)
})

//TYPE-2 : API Endpoints

app.get('/api/data', (req, res) => {
  console.log('this one was for data')
  res.status(599).send(data)
})

app.post('/api/data', (req, res) => {
   const newEntry = req.body;
   console.log(newEntry)
   data.push(newEntry.name)
  //  res.sendStatus(201);
   res.redirect('/')
})

app.delete('/api/data', (req, res) => {
  data.pop()
  console.log('We deleted the element of the end of the array')
  res.sendStatus(203)
})

app.listen(PORT, () => {
  console.log( `server has started on: ${PORT}`)
})