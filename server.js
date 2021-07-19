// define the requirements from express router
const fs = require("fs");
const express = require('express')
const app = express()
const path = require('path')

// set up port variable / server  to host at 5000 as default
const port = process.env.PORT || 5000



app.use(express.static('./client/public'))

// set up server to listen to requests at the port specified
app.listen(port, () => {
  console.log('listening on port:', port)
})

//see all restaurant IDs as JSON
app.get("/api", (req, res) => {
  res.sendFile(path.resolve('./api/resIndex.json'))
})

//see all the available restaurants in JSON
app.get("/api/:restaurant", (req, res) => {
  res.sendFile(path.resolve('./api/' + req.params.restaurant + '.json'));
});

//setting up the catch all route 
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/public/index.html'))
});



// when the server is ready to take the comment
app.post('/note/:restaurant',
  //acts as a middleware for server before it takes the the form
  express.urlencoded({ extended: false }),
  (req, res) => {
  
    let newNote = req.body
  
    let restaurantId = req.params.restaurant

    addComment(restaurantId, newNote, res)
  })

//Comment Section helper function

function addComment(restaurantId, newNote, res) {
  console.log(restaurantId)
  //variable is assigned to the route to pull the restaurant information
  let restaurantDataFile = "./api/" + restaurantId + ".json"
  //readFileSync-read the full content of the file in memory before returning the data
  let restaurantComment = JSON.parse(fs.readFileSync(restaurantDataFile))
  console.log(restaurantComment)
  //add a new comment
  restaurantComment.notes.push(newNote.body)
  console.log(restaurantComment)
  // the current notes section is updated with the new comments added
  //stringify converts js objects to json
  //fs.writeFileSync-creates a new file when a file doesn't exist
  fs.writeFileSync(restaurantDataFile, JSON.stringify(restaurantComment), () => {
      res.sendFile(path.resolve('./client/public/index.html'))
})}
