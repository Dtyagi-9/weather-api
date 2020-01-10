const request = require('request') 
//function to use mapbox api  "geocode"

const extractor = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGV2LXR5YWdpOSIsImEiOiJjazRtZ3h3NnIwNG14M25wNXVydTE3MWhmIn0.o6HRmaOSRiGQ7GRAhO1W4Q&limit=1'
    request({ url: url,json: true}/** passing parameters for the http request*/,(error,response)=>{
        if (error){
            callback('unable to connect to the host')
        }else if(response.body.features.length === 0)
        {
            callback('unable to find location ,Try another search',undefined)
        }
        else{
        const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0] 
        callback(undefined,{//yaha pr undefined add kr rhe h forthe error in the callback
            place_name:response.body.features[0].place_name,
            latitude:response.body.features[0].center[1],
            longitude:response.body.features[0].center[0]
            
        })
        }
    })
}

module.exports = {
    extractor
}
