
function getClinics()
{
    fetch ("http://localhost:3001/clinicInfo")
    .then((dataAsStringFromOurApi)=>{
       return dataAsStringFromOurApi.json(); 
    })
     .then ((data)=>{
        var clinicsArray = data.recordset; //תביא את רקורדסט למשתנה שנוח לי בשם שבחרתי

        for (let i = 0; i < clinicsArray.length; i++) {
            var clinicNumberX = clinicsArray[i];
            document.querySelector("#clinicsinfo").innerHTML +=
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
getClinics()

// ==============================================

function getVaccineCatalog()
{
    fetch ("http://localhost:3001/catalog")
    .then((dataAsStringFromOurApi)=>{
       return dataAsStringFromOurApi.json(); 
    })
     .then ((data)=>{
        var catalogsArray = data.recordset; //תביא את רקורדסט למשתנה שנוח לי בשם שבחרתי

        for (let i = 0; i < catalogsArray.length; i++) {
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

function sendClinicAndDateTime ()
{
    var HDNSelect=document.querySelector("#HDNinput").value;
    var clinicSelect=document.querySelector("#clinicinput").value;
    var datetimeSelect=document.querySelector("#datetimeinput").value;

    var myBody={
        "HDN":HDNSelect,
        "clinic":clinicSelect,
        "datetime":datetimeSelect
    }

    fetch ("/appointmentsByClinic",{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(myBody)  
    })   
    .then((dataFromServer)=>{
        return dataFromServer.json();
    })
    .then((dataAsObject)=>{
        var appointmentRecordAsArr = dataAsObject;
        var schduledAppointment = appointmentRecordAsArr[0];
        console.log(schduledAppointment);
        document.querySelector("#displayDataFromDatabase").innerHTML +=
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


function sendHDN ()
{
    var userIDelect=document.querySelector("#userIDinput").value;
    //RadioButtons
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


    var myBody={
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

    fetch ("/HDNformSubmission",{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(myBody)  
    })   
    .then((dataFromServer)=>{
        return dataFromServer.json();
    })
    .then((dataAsObject)=>{
        var HDNArr = dataAsObject;
        var HDN = HDNArr[0];
        document.querySelector("#HDNNUM").innerHTML +=
        `
        <div class="HDNnumberAfterSubmission">
            <div>מספר ההפנייה שלך: ${HDN.HDNGenID}  </div>
            <a href="appointment.html">למעבר לקביעת תור</a></br></br>

        </div>
        `    
    })
}