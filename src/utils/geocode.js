const request = require('request')

const geocode = (address, callback) => {

    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2FuZGlwZGdpbiIsImEiOiJjanpkeGI4dXkwMmp6M2ZwaGRrMXlqOXAwIn0.h97ToCqpVNjM40lDuxcUzw'

    // response object destructure body
    request({ url: geoCodeUrl, json: true }, (error, { body }) => {
        if (error) {
            // console.log("if ", error)
            callback('Unable to connect to location service', undefined)
        } else if (body.error) {
            // console.log("else if ", body.error)
            callback('Unable to find location. Try another search.', undefined)
        } else {
            // console.log("else ", body.features[0])
            const latitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            const location = body.features[0].place_name
            callback(undefined, { location, latitude, longitude })
        }
    })

}

module.exports = geocode;