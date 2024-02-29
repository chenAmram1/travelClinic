
var express = require('express');
var app = express();
app.use(express.json());
var myRepository= require('./myRepository')

  //=========================


  app.get("/clinicInfo", async (req,res)=>{// הבאת נתוני מרפאות מהדאטהבייס
    var theClinics =await  myRepository.getClinics ();
    console.log(theClinics);
    res.json(theClinics)
  });


   //===============================

   app.get("/catalog", async (req,res)=>{// הבאת נתוני קטלוג חיסונים מהדאטהבייס
    var theCatalog =await  myRepository.getVaccineCatalog ();
    console.log(theCatalog);
    res.json(theCatalog)
  });


   //===============================
    app.post ("/appointmentsByClinic",async (req,res)=>{//הכנסת נתוני זימון תור לדאטהבייס
      console.log(req.body);
      var result=await myRepository.getAppointment(req.body.clinic, req.body.date, req.body.time)
      console.log("the appointment is: ",result);
     req.json({});
    
    
    
    });



   //===============================


  
app.use(express.static('frontend'));

const port = process.env.PORT ||  3001;

app.listen(port, function () {
  console.log(`My app is listening on port ${port}!`);
});



