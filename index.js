const AppId = '3a89a784f3afb2d09555f693cdecd4d6';  
 
// get lat and long using zip code
function getLatLonByZipCode(){

    var ZipCode = document.getElementById("zipCode").value;
   
         fetch('https://api.openweathermap.org/geo/1.0/zip?zip='+ZipCode+'&appid='+AppId)
        .then(response => response.json())
        .then(data => {
                 // data is the response data from weather api, validating it with the response data and keys
           if(data.cod == '404'){ // data.cod and data.message is the key from response data  
           }else{
            document.getElementById('cityName').innerHTML = data.name;  
            let lat = data.lat;
            let lon = data.lon;
            //passing latitude and longitude to a function
            getWeatherReport(lat,lon);
           }
        });

}

//pass lat and long to get current weather data
function getWeatherReport(lat,lon){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&appid='+AppId)
    .then(response => response.json())
    .then(data => {
        if(data.cod == '404'){
            alert(data.message);
        }else{
            console.log(data);
            let currentDate = new Date(data.current.dt * 1000);
            var convertedDate = currentDate.toLocaleDateString('en-us', {
                weekday: 'long',
                day : 'numeric',
                month : 'long',
                year : 'numeric'
            });
            
            document.getElementById('currentDate').innerHTML = convertedDate; 
            let currentTemp = data.current.temp+' <span>&#8457;</span>';
            document.getElementById('currentTemp').innerHTML = currentTemp; 
            let currentCondition = data.current.weather[0]['description'];
            document.getElementById('currentCondition').innerHTML = currentCondition; 
                         console.log(data.current.weather[0]['icon'])
            document.getElementById('icon').src = 'http://openweathermap.org/img/wn/'+data.current.weather[0]['icon']+"@2x.png"; 
            
            let TempHiLo = '';
            let hourlyRecords = data.hourly;
            let minTemp = maxTemp = hourlyRecords[0]['temp'];

            /* use this for loop for getting min and max */
            for (let i=0 ; i<23 ; i++){
                 if (hourlyRecords[i]['temp'] > maxTemp)
                      maxTemp =  hourlyRecords[i]['temp'];
                 else if (hourlyRecords[i]['temp'] < minTemp)
                       minTemp =  hourlyRecords[i]['temp'];
                       
            } 
            TempHiLo = +maxTemp+' <span>&#8457;</span>' + ' / '+minTemp+' <span>&#8457;</span>';
            document.getElementById('TempHiLow').innerHTML = TempHiLo; 

          
        }        
    });
}