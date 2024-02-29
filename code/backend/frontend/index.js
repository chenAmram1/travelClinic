
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