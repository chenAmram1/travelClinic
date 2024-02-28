
var express = require('express');
var app = express();
var myRepository= require('./myRepository')

  //=========================


  app.get("/clinics", async (req,res)=>{
    var theClinics =await  myRepository.getClinics ();
    console.log("CHEN TEST 1")
    console.log(theClinics);
    res.json(theClinics)
  });


   //=========================


  // app.get("/test", (req, res) => {
  //   res.json({
  //     fname:"chen"
    

  //   });
      
    
  // })


  
app.use(express.static('frontend'));

const port = process.env.PORT ||  3001;

app.listen(port, function () {
  console.log(`My app is listening on port ${port}!`);
});



