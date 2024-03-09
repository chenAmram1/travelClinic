
var express = require('express');
var app = express();
app.use(express.json());
var myRepository= require('./myRepository')

  //=========================


  app.get("/clinicInfo", async (req,res)=>{//  הבאת נתוני מרפאות מהדאטהבייס באמצעות פעולה א-סינכורנית שממתינה לקבלת הנתונים מהDB
    var theClinics =await  myRepository.getClinics ();// אני מאחסנת את המרפאות במשתנה שיצרתי ומשתמשת בפונקציה שמחברת לDB
    res.json(theClinics)// החזרת מערך נתוני מרפאות
  });


   //===============================

   app.get("/catalog", async (req,res)=>{// הבאת נתוני קטלוג חיסונים מהדאטהבייס
    var theCatalog =await  myRepository.getVaccineCatalog ();// אני מאחסנת את הנתונים במשתנה שיצרתי ומשתמשת בפונקציה שמחברת לDB
    res.json(theCatalog)// החזרת מערך נתוני הקטלוג
  });


   //===============================
    app.post ("/appointmentsByClinic",async (req,res)=>{//הכנסת נתוני זימון תור לדאטהבייס
      console.log("Doctor's appointment request sent to DB with: ", req.body.HDN, req.body.clinic, req.body.datetime);//רישום פרטי התור לקונסולה לצורך בדיקות
      var result = await myRepository.setAppointment(req,req.body.HDN, req.body.clinic, req.body.datetime);// הקצאת משתנה לאחסון תוצאות הפעולה
      res.json(result.recordset);// פונקציה להחזרת הנתונים כקובץ גייסון
    });



   //===============================

   app.post ("/HDNformSubmission",async (req,res)=>{//הכנסת נתוני זימון תור לדאטהבייס
    console.log("HDN submission request sent to DB with: ", req.body.userID, req.body.AcuteDisease, req.body.ChronicIllness, req.body.ImmuneSysDefect, req.body.PerMed,req.body.MedSensitivity,req.body.VaccAllergy,req.body.BloodTransfusion,req.body.Hepatitis,req.body.Pox,req.body.Pregnancy);// רישום פרטים לצורך בדיקות
    var result = await myRepository.HDNformSubmission( req, req.body.userID, req.body.AcuteDisease, req.body.ChronicIllness, req.body.ImmuneSysDefect, req.body.PerMed,req.body.MedSensitivity,req.body.VaccAllergy,req.body.BloodTransfusion,req.body.Hepatitis,req.body.Pox,req.body.Pregnancy);// הקצאת משתנים
    res.json(result.recordset);
  });



 //===============================

  
app.use(express.static('frontend'));

const port = process.env.PORT ||  3001;

app.listen(port, function () {
  console.log(`My app is listening on port ${port}!`);
});



