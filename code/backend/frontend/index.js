function myfunction()
{
    fetch ("https://randomuser.me/api/?results=50")
    .then((dataAsStringFromOurApi)=>{
       return dataAsStringFromOurApi.json(); 
    })
     .then ((data)=>{
         document.querySelector ("#mydiv").innerHTML=
         data.results[0].name.first;

     })
}

myfunction();


function getMyownData()
{
    fetch ("http://localhost:3001/clinics")
    .then((dataAsStringFromOurApi)=>{
       return dataAsStringFromOurApi.json(); 
    })
     .then ((data)=>{
         document.querySelector ("#mydiv1").innerHTML=
         data.NameOfClinic;

     })
}

getMyownData();