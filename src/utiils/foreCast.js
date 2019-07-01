const request = require('request');
const foreCast = (longitude, latitude, callBack) => {
    const url = 'https://api.darksky.net/forecast/d8f5035a1f6786a817a52c9bd8de6492/' + latitude + ',' + longitude + '?units=si'
    request({ url: url, json: true }, (err, { body }) => {

        const { error, currently,hourly } = body
        console.log("BOdy ",JSON.stringify(body))
        if (err) {
            callBack('Some ErrorOccurs networks', undefined)
        } else if (error) {
            callBack('Some ErrorOccurs', undefined)
        } else {
            callBack(undefined, "The temperature is " + currently.temperature + "`c .the chance of rain is " +
                changeStringToFloat(currently.precipProbability) + "%. "+hourly.summary)
        
        }

    })
}



const changeStringToFloat = (string) => {
    return parseFloat(string) * 100
}

module.exports = { foreCast }