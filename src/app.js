const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { geoCode } = require('./utiils/geoCode.js')
const { foreCast } = require('./utiils/foreCast.js');

const app = express();

const pathDirectoryString = path.join(__dirname, '../public')
const viewPathDirecotory = path.join(__dirname, '../templates/views')
const partialPathDirectory = path.join(__dirname, '../templates/partials')
app.use(express.static(pathDirectoryString))
app.set('views', viewPathDirecotory)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPathDirectory)
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "SHASHANT BARTWAL"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "SHASHANT BARTWAL"

    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Do you need any help?",
        name: "SHASHANT BARTWAL"

    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        console.log("no search")
        res.send({
            error: "No address is povided"
        })
    } else {
        geoCode(req.query.address, (error, { longitude, latitude, location } = {}) => {
            if (error != undefined) {
                res.send({
                    error: "Address is not valid"
                })
            } else {
                foreCast(longitude, latitude, (error, forecastData) => {
                    if (error != undefined) {
                        res.send({
                            error: "Some error occur in fetching logintude and latitude"
                        })
                    } else {
                        // console.log(forecastData)
                        res.send({
                            forecastData: forecastData,
                            location,
                            address: req.query.address
                        })
                    }
                })
            }
        })
        // console.log("serach variable ", req.query.search)
        // res.send({
        //    address:req.query.address
        // })
    }

})
app.get('/help/*', (req, res) => {
    res.render('404error', {
        message: "Help page not found",
        title: "404 error",
        name: "SHASHANT BARTWAL"
    })
})

app.get('*', (req, res) => {
    res.render('404error', {
        message: "Page not found",
        name: "SHASHANT BARTWAL",
        title: "Weather",

    })
})


app.listen(3000, () => {
    console.log("SERVER IS UP ON 3000")
})