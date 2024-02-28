
var express = require('express');
var app = express();

var myRepository= require('./myRepository')

  //=========================


  app.get("/clinics", async (req,res)=>{
    var theClinics =await  myRepository.getClinics ();
    console.log(theClinics);




  })


   //=========================


  // app.get("/test", (req, res) => {
  //   res.json({
  //     fname:"chen"
    

  //   });
      
    
  // })


  
app.use(express.static('frontend'));

app.listen(3001, function () {
    console.log('My app is listening on port 3001!');
});
