
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