const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const upload = require("express-fileupload");
const connection = require("./Database/dbconnection");
const path = require("path");
const fs = require("fs");
const fastcsv = require("fast-csv");

//parse requests to body-purser
app.use(upload());
app.use(bodyparser.urlencoded({extended: true}));

//homepage
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html")
})

//Upload file to server and data to database
app.post('/', (req,res) => {
  if(req.files){
    var file = req.files.file;
    var filename = file.name;
    file.mv('./Uploads/' + filename, function(err){
      if(err){
        res.send(err)
      }else{
        res.send("File uploaded")
      }
    })
let stream = fs.createReadStream('./Uploads/' + filename);
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    csvData.shift();
    // create a new connection to the database
   connection;
    // open the connection
    let query = "INSERT INTO <Your-tablename> (date,groupname,operator,mobile,amount) VALUES ?";
  connection.query(query, [csvData], (error, response) => {
    console.log(error || response);
  });
  });
stream.pipe(csvStream);
  }
})

app.listen(7000, () => {
    console.log("Server running on port 7000");
})

