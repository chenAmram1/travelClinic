// function myfunction()
// {
//     fetch ("https://randomuser.me/api/?results=50")
//     .then((dataAsStringFromOurApi)=>{
//        return dataAsStringFromOurApi.json(); 
//     })
//      .then ((data)=>{
//          document.querySelector ("#mydiv").innerHTML=
//          data.results[0].name.first;

//      })
// }

// myfunction();


function getClinics()
{
    fetch ("http://localhost:3001/clinics")
    .then((dataAsStringFromOurApi)=>{
       return dataAsStringFromOurApi.json(); 
    })
     .then ((data)=>{
        var clinicsArray = data.recordset; //תביא את רקורדסט למשתנה שנוח לי בשם שבחרתי
        
        var AfulaClinicMor = clinicsArray[2]; //בוחרים את התא השני במערך שהוא הקליניקה בעפולה
        document.querySelector("#mydiv1").innerHTML = AfulaClinicMor.city; //נצפה שיודפס עפולה

    //     for (let i = 0; i < clinicsArray.length; i++) {
    //         var clinicNumberX = clinicsArray[i];
    //         document.querySelector("#mydiv1").innerHTML +=
    // `
    // <ul>
    //     <li> ${clinicNumberX.city} </li>
    // </ul>
    // `    
    //     }
    })
}
getClinics()