
var express = require('express');
var app = express();
app.use(express.json());
var myRepository= require('./myRepository')

  //=========================


  app.get("/clinicInfo", async (req,res)=>{// הבאת נתוני מרפאות מהדאטהבייס
    var theClinics =await  myRepository.getClinics ();
    // console.log(theClinics);
    res.json(theClinics)
  });


   //===============================

   app.get("/catalog", async (req,res)=>{// הבאת נתוני קטלוג חיסונים מהדאטהבייס
    var theCatalog =await  myRepository.getVaccineCatalog ();
    // console.log(theCatalog);
    res.json(theCatalog)
  });


   //===============================
    app.post ("/appointmentsByClinic",async (req,res)=>{//הכנסת נתוני זימון תור לדאטהבייס
      // console.log(req.body);
      console.log("Doctor's appointment request sent to DB with: ", req.body.HDN, req.body.clinic, req.body.datetime);
      var result = await myRepository.setAppointment(req,req.body.HDN, req.body.clinic, req.body.datetime);
      res.json(result.recordset);
    });



   //===============================

   app.post ("/HDNformSubmission",async (req,res)=>{//הכנסת נתוני זימון תור לדאטהבייס
    console.log("HDN submission request sent to DB with: ", req.body.userID, req.body.AcuteDisease, req.body.ChronicIllness, req.body.ImmuneSysDefect, req.body.PerMed,req.body.MedSensitivity,req.body.VaccAllergy,req.body.BloodTransfusion,req.body.Hepatitis,req.body.Pox,req.body.Pregnancy);
    var result = await myRepository.HDNformSubmission( req, req.body.userID, req.body.AcuteDisease, req.body.ChronicIllness, req.body.ImmuneSysDefect, req.body.PerMed,req.body.MedSensitivity,req.body.VaccAllergy,req.body.BloodTransfusion,req.body.Hepatitis,req.body.Pox,req.body.Pregnancy);
    res.json(result.recordset);
  });



 //===============================

  
app.use(express.static('frontend'));

const port = process.env.PORT ||  3001;

app.listen(port, function () {
  console.log(`My app is listening on port ${port}!`);
});



