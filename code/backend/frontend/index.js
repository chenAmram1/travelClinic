
function getClinics()//פונקציה זו אחראית על הבאת רשימת מרפאות ממסד הנתונים (DB) והצגתה בדף.
{
    fetch ("http://localhost:3001/clinicInfo")//הפונקציה משתמשת בפונקציה fetch כדי לשלוח בקשת GET
    .then((dataAsStringFromOurApi)=>{
       return dataAsStringFromOurApi.json(); //תובת זו צפויה להחזיר נתונים בפורמט JSON.
    })
     .then ((data)=>{// לאחר המרת הנתונים לאובייקט, הפונקציה שומרת את מערך המרפאות במשתנה בשם clinicsArray.
        var clinicsArray = data.recordset; //תביא את רקורדסט למשתנה  בשם שבחרתי

        for (let i = 0; i < clinicsArray.length; i++) {//הפונקציה משתמשת בלולאה for כדי לעבור על כל מרפאה במערך clinicsArray.
            var clinicNumberX = clinicsArray[i];
            document.querySelector("#clinicsinfo").innerHTML +=//בתוך הלולאה, הפונקציה משתמשת ב-DOM API כדי להוסיף רשימה (ul) חדשה עם פרטי המרפאה לתוך ה-div בעל ה-id "clinicsinfo".
    `
    <ul>
        <li> שם המרפאה: ${clinicNumberX.NameOfClinic} </li> 
        עיר: ${clinicNumberX.city}  <br>
        רחוב :${clinicNumberX.street} ${clinicNumberX.numOfHouse}  <br>
       מספר טלפון: ${clinicNumberX.TelNO}  <br><br>
    </ul>
    `    
        }
    })
} 
getClinics()// הפונקציה getClinics() נקראת בסוף הקובץ.

// ==============================================

function getVaccineCatalog()
{
    fetch ("http://localhost:3001/catalog")//הפונקציה משתמשת בפונקציה fetch כדי לשלוח בקשת GET לכתובת
    .then((dataAsStringFromOurApi)=>{
       return dataAsStringFromOurApi.json(); //כתובת זו צפויה להחזיר נתונים בפורמט JSON.

    })
     .then ((data)=>{
        var catalogsArray = data.recordset; //לאחר המרת הנתונים לאובייקט, הפונקציה שומרת את מערך קטלוג החיסונים במשתנה בשם catalogsArray.

        for (let i = 0; i < catalogsArray.length; i++) {//הפונקציה משתמשת בלולאה for כדי לעבור על כל חיסון במערך catalogsArray.
            var catalogNumberX = catalogsArray[i];
            document.querySelector("#vaccineCatalog").innerHTML +=
    `
    <ul>
        <li> שם החיסון: ${catalogNumberX.NameOfVaccine} </li> 
         מספר פעימות: ${catalogNumberX.NoOfDoses} <br>

    </ul>
    `    
        }
    })
}
getVaccineCatalog()

// ==========================================

function sendClinicAndDateTime ()//הנתונים נשמרים במשתנים HDNSelect, clinicSelect, ו-datetimeSelect בהתאמה.
{
    var HDNSelect=document.querySelector("#HDNinput").value;
    var clinicSelect=document.querySelector("#clinicinput").value;
    var datetimeSelect=document.querySelector("#datetimeinput").value;

    var myBody={//הפונקציה יוצרת אובייקט בשם myBody.
        //האובייקט מכיל את הנתונים שנאספו מהמשתמש בשמות המשתנים הבאים
        "HDN":HDNSelect,
        "clinic":clinicSelect,
        "datetime":datetimeSelect
    }

    fetch ("/appointmentsByClinic",{//הפונקציה משתמשת ב-fetch API כדי לשלוח בקשת POST לכתובת
    method: "POST",
    headers: {
        "Content-Type": "application/json",// מציין שהגוף של הבקשה הוא בפורמט JSON.
        },
        body: JSON.stringify(myBody)  //הגוף של הבקשה'בודי' מכיל את האובייקט 'מייבאדי' שהומרה למחרוזת גייסון
    })   
    .then((dataFromServer)=>{// קבלת תגובה מהשרת
        return dataFromServer.json();
    })
    .then((dataAsObject)=>{// עיבוד תגובה מהשרת
        var appointmentRecordAsArr = dataAsObject;
        var schduledAppointment = appointmentRecordAsArr[0];
        console.log(schduledAppointment);
        document.querySelector("#displayDataFromDatabase").innerHTML +=// עדכון ממשק משתמש
        `
        <div class="UserAppointment">
        <h3> מעולה! אנחנו פנויים במועד שרצית! להלו פרטי התור: </h3><br>
            <div>  מספר התור שלך: ${schduledAppointment.appointmentID} </div>
            <div>שם המרפאה שלך:  ${schduledAppointment.nameOfclinic} </div>
            <div> מועד התור שלך: ${schduledAppointment.datetimeOfAppointment} </div>
        </div>
        `    
    })
}

// ============================================================


function sendHDN ()//פונקציה זו אחראית על איסוף נתונים ממשתמש לגבי ההיסטוריה הרפואית שלו, יצירת גוף בקשה (Body) ושליחתו לשרת.
{
    var userIDelect=document.querySelector("#userIDinput").value;
    //רשימות כפתורי הרדיו נשמרות במשתנים הבאים
    var AcuteDiseaseRadioButtons = document.getElementsByName('AcuteDisease');
    var AcuteDiseaseValue;
    var ChronicIllnessRadioButtons = document.getElementsByName('ChronicIllness');
    var ChronicIllnessValue;
    var ImmuneSysDefectRadioButtons = document.getElementsByName('ImmuneSysDefect');
    var ImmuneSysDefectValue;
    var PerMedRadioButtons = document.getElementsByName('PerMed');
    var PerMedValue;
    var MedSensitivityRadioButtons = document.getElementsByName('MedSensitivity');
    var MedSensitivityValue;
    var VaccAllergyRadioButtons = document.getElementsByName('VaccAllergy');
    var VaccAllergyValue;
    var BloodTransfusionRadioButtons = document.getElementsByName('BloodTransfusion');
    var BloodTransfusionValue;
    var HepatitisRadioButtons = document.getElementsByName('Hepatitis');
    var HepatitisValue;
    var PoxRadioButtons = document.getElementsByName('Pox');
    var PoxValue;
    var PregnancyRadioButtons = document.getElementsByName('Pregnancy');
    var PregnancyValue;

    for (var i = 0; i < 2; i++) {
         //בתוך הלולאה, הפונקציה בודקת באמצעות צק איזה כפתור רדיו נבחר בכל קבוצה.
         // ושומרת את ערך שלו  במשתנה המתאים
        if (AcuteDiseaseRadioButtons[i].checked) {
            AcuteDiseaseValue = AcuteDiseaseRadioButtons[i].value;
        }
        if (ChronicIllnessRadioButtons[i].checked) {
            ChronicIllnessValue = ChronicIllnessRadioButtons[i].value;
        }
        if (ImmuneSysDefectRadioButtons[i].checked) {
            ImmuneSysDefectValue = ImmuneSysDefectRadioButtons[i].value;
        }
        if (PerMedRadioButtons[i].checked) {
            PerMedValue = PerMedRadioButtons[i].value;
        }
        if (MedSensitivityRadioButtons[i].checked) {
            MedSensitivityValue = MedSensitivityRadioButtons[i].value;
        }
        if (VaccAllergyRadioButtons[i].checked) {
            VaccAllergyValue = VaccAllergyRadioButtons[i].value;
        }
        if (BloodTransfusionRadioButtons[i].checked) {
            BloodTransfusionValue = BloodTransfusionRadioButtons[i].value;
        }
        if (HepatitisRadioButtons[i].checked) {
            HepatitisValue = HepatitisRadioButtons[i].value;
        }
        if (PoxRadioButtons[i].checked) {
            PoxValue = PoxRadioButtons[i].value;
        }
        if (PregnancyRadioButtons[i].checked) {
            PregnancyValue = PregnancyRadioButtons[i].value;
        }
    }


    var myBody={//האובייקט מכיל את הנתונים שנאספו מהמשתמש בשמות המשתנים הבאים
        "userID":userIDelect,
        "AcuteDisease":AcuteDiseaseValue,
        "ChronicIllness":ChronicIllnessValue,
        "ImmuneSysDefect":ImmuneSysDefectValue,
        "PerMed":PerMedValue,
        "MedSensitivity":MedSensitivityValue,
        "VaccAllergy":VaccAllergyValue,
        "BloodTransfusion":BloodTransfusionValue,
        "Hepatitis":HepatitisValue,
        "Pox":PoxValue,
        "Pregnancy":PregnancyValue
    }

    console.log("CHEN TEST HDN VALUES: ", myBody)

    fetch ("/HDNformSubmission",{//הפונקציה משתמשת ב-fetch API כדי לשלוח בקשת POST לכתובת
    method: "POST",
    headers: {
        "Content-Type": "application/json",//מציין שהגוף של הבקשה הוא בפורמט JSON.
        },
        body: JSON.stringify(myBody)  
    })   
    .then((dataFromServer)=>{//קבלת התגובה
        return dataFromServer.json();
    })
    .then((dataAsObject)=>{// עיבוד התגובה
        var HDNArr = dataAsObject;
        var HDN = HDNArr[0];
        document.querySelector("#HDNNUM").innerHTML =
        `
        <div class="HDNnumberAfterSubmission">
            <div>מספר ההפנייה שלך: ${HDN.HDNGenID}  </div>
            <a href="appointment.html">למעבר לקביעת תור</a>
        </div>
        `    
    })
}