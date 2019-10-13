const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/b13ae5f3770e2df740c55caa9695a4be/' + lat + ',' + long + '?units=si&exclude=hourly,flags'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({ error: "Unable to connect to the Weather Service" }, undefined)
        } else if (body.error) {
            callback({ error: "Unable to find location" }, undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temp: body.currently.temperature,
                rainPercentage: body.currently.precipProbability,
                humidity: body.currently.humidity
            })
        }
    })
}

module.exports = forecast
