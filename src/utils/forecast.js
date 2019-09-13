const request = require ('request')

const forecast = (latitude, longitude, callback)=>{
    const url= 'https://api.darksky.net/forecast/c279e789121ad02955554aacc603de63/'+latitude +','+ longitude
    request({url, json: true}, (error, {body})=>{
        
                              
        if(error){
            callback('Unable to connect to internet', undefined)
        } else if (body.error){
            callback('there is an error in search terms', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature +' degrees. There is '+body.currently.precipProbability+'% chance of rain. The daily maximum temperature is '+body.daily.data[0].temperatureHigh+' degrees.' 
                
            )
        }
    })
}

module.exports=forecast