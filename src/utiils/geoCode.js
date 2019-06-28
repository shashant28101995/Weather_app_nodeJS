const request = require('request');

const split = (val) => {
    var array = val.split(' ');
    console.log(array)
    return array
}

const arrayToString = (arr) => {
    var str = '';
    arr.map((data, i) => {
        console.log(data + " " + i)
        if (i < arr.length - 1) {
            str += data + '%20and'
        } else {
            str += "%20" + data;
        }
    })
    console.log(str)
    return str;
}
const geoCode = (addres, callBack) => {

    const geoCcodingURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + arrayToString(split(addres)) + '.json?access_token=pk.eyJ1Ijoic2hhc2hhbnQyOCIsImEiOiJjangxYjRjMW4wMDU5NDNvZTdseGpvejN3In0.1yg7bIkku3ta_wDSkX9Sfg';
    console.log(geoCcodingURL)
    request({ url: geoCcodingURL, json: true }, (error, { body }) => {
        console.log(body)
        const { features } = body
        if (error) {
            callBack('Some ErrorOccurs networks', undefined)
        } else if (!features) {
            // console.log("No longitude 1", response.body)
            callBack('No longitude nad latitude available', undefined)
        } else if (features.length == 0) {
            //console.log("No longitude 2", response.body)
            callBack('No longitude nad latitude available', undefined)
        } else {
            const longitude = features[0].center[0];
            const latitude = features[0].center[1]
            const location = features[0].place_name
            console.log(longitude + " " + latitude)
            callBack(undefined, {
                longitude: longitude,
                latitude: latitude,
                location: location
            })
        }
    })
}

module.exports = { geoCode }