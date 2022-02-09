const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=52cb9c1735aa14d2b9af03915a6135a3&query=' + latitude + ',' + longitude +'&units=m';

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the weather service', undefined)
        }else if(body.error) {
            callback('Unable to find the location', undefined)
        }else {
            callback(undefined, body.current.weather_descriptions[0] +". it is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })
}


module.exports = forecast;