const request = require('request')
const fs = require('fs')
const loc = require('./utils/locationextractor.js')
const forecast = require('./utils/forecast.js')

//to store result data
const result_data ={}

//to pass the loction as an argument in cli
const place = process.argv[2]
if(!place){
    console.log('location not specified')
}
else{
//calling the locationextractor.js inside utils to extract latitude and longitudes of the place
//API used : Mapbox 
loc.extractor(place,(error,data)=>{
    if(error){
        return console.log(error)
    }
    else{
        //using latitude and longitudes of the place to make another api calls 
        //API used : openWeather and darksky.net 
        forecast.forecast1(data.latitude,data.longitude, (error, forecastData) => {
            if(error){
                console.log('Error', error)
            }
            else{
                //embedding location coordinates in result data
                result_data.location = {
                    "latitutde":data.latitude,
                    "longitude":data.longitude
                }
                //embedding various req parameters and results in result data 
                result_data.time = forecastData.time;
                result_data.precipIntensity = forecastData.precipIntensity
                result_data.precipProbability = forecastData.precipProbability
                forecast.forecast2(data.latitude,data.longitude, (error, forecastData) => {
                    if(error){
                        console.log('Error', error)
                    }
                    else{
                        //embedding various req parameters and results in result data
                        result_data.temp = forecastData.main.temp;
                        result_data.pressure = forecastData.main.pressure;
                        result_data.wind_speed = forecastData.wind.speed;
                        result_data.wind_deg = forecastData.wind.deg;
                        saveResult(result_data)
                    }
                })
            }
        })
        

    }

    
})
}

const saveResult = (notes)=>{
    notes = JSON.stringify(notes);
    fs.appendFileSync('data.json',notes);
};
// after both the calls complete we can obtain our result in the result_data json object 
