
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
        <li> עיר: ${clinicNumberX.city} </li>
        <li>רחוב :${clinicNumberX.street} ${clinicNumberX.numOfHouse} </li>
        <li>מספר טלפון: ${clinicNumberX.TelNO} </li>
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
        <li> מספר פעימות: ${catalogNumberX.NoOfDoses} </li>

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
        console.log("CHEN TEST 1: ");
        return dataFromServer.json();
    })
    .then((dataAsObject)=>{
        console.log("CHEN TEST 2: ", dataAsObject);
        var appointmentRecordAsArr = dataAsObject;
        var schduledAppointment = appointmentRecordAsArr[0];
        console.log(schduledAppointment);
        document.querySelector("#displayDataFromDatabase").innerHTML +=
        `
        <div class="oneRowUsers">
            <div> ${schduledAppointment.appointmentID} </div>
            <div> ${schduledAppointment.HDN} </div>
            <div> ${schduledAppointment.nameOfclinic} </div>
            <div> ${schduledAppointment.datetimeOfAppointment} </div>
        </div>
        `    
    })
}
sendClinicAndDateTime ()