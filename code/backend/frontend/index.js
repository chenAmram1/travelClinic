
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
    var clinicSelect=document.querySelector("#clinicinput").value;
    var dateSelect=document.querySelector("#dateinput").value;
    var timeSelect=document.querySelector("#timeinput").value;
    var myBody={
        "clinic":clinicSelect,
        "date":dateSelect,
        "time":timeSelect
    }
    console.log(myBody);

    fetch ("/appointmentsByClinic",{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
            },
    body: JSON.stringify(myBody)  
    });

}
sendClinicAndDateTime ()