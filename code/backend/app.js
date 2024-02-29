
var express = require('express');
var app = express();
var myRepository= require('./myRepository')

  //=========================


  app.get("/clinicInfo", async (req,res)=>{
    var theClinics =await  myRepository.getClinics ();
    console.log(theClinics);
    res.json(theClinics)
  });


   //=========================


  
app.use(express.static('frontend'));

const port = process.env.PORT ||  3001;

app.listen(port, function () {
  console.log(`My app is listening on port ${port}!`);
});



