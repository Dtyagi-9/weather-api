const request = require('request')
const chalk = require('chalk') 


const forecast1 = (latitude,longitude,callback)=>{
    //Darksky API call 
    let url = 'https://api.darksky.net/forecast/1264232d7c486804023c679f7c12ec4b/'+latitude+','+longitude
    request({url:url,json:true},(error,response)=>{
    if(error){
        callback(chalk.red.inverse('unable to connect to the weather service!'),undefined)
    }else if (response.body.error){
        callback(chalk.red.inverse('unable to find the location!'),undefined)
    }
    else{

        callback(undefined,response.body.currently)//.daily.data[0].summary 
    }
    })   
}
const forecast2 = (latitude,longitude,callback)=>{
    //OpenWeather API call
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID=81b717124c273e260289e38b838edb0a'    
    request({url:url,json:true},(error,response)=>{
    if(error){
        callback(chalk.red.inverse('unable to connect to the weather service!'),undefined)
    }else if (response.body.error){
        callback(chalk.red.inverse('unable to find the location!'),undefined)
    }
    else{

        callback(undefined,response.body)//.daily.data[0].summary 
    }
    })   
}    

module.exports = {
    forecast1 ,
    forecast2

}
