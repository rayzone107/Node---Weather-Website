const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?country=in&limit=1&access_token=pk.eyJ1IjoicmFjaGl0Z295YWwiLCJhIjoiY2sxOWk2dzkwMDRmcDNwcjVwMWd2dHN0aCJ9.NsmbW7zaUeUhf0Vx_UbbfA'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({ error: "Unable to connect to the Weather Service" }, undefined)
        } else if (body.features && body.features.length == 0) {
            callback({ error: "Unable to find location" }, undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                lat: body.features[0].center[1],
                long: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode
