const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// console.log('dir = ', __dirname)
// console.log('file = ', __filename)
console.log('file 2 - ', path.join(__dirname, '../public'))
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sandip Gadhave'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name: 'About us by Sandip Gadhave'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    // destructure object { latitude, longitude, location } = {} 

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            console.log('Error', error);
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                console.log('Error ', error)
            }
            console.log('location ', location)
            console.log('Data ', forecastData)

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forcast: 'forcast',
    //     location: req.query.address,
    //     address: req.query.address
    // })
})

app.get('*', (req, res) => {
    res.render('pagenotfound', {
        title: '404',
        name: 'Sandip Gadhave',
        errorMessage: 'Page not found.'
    })
})


// app.get('/help', (req, res) => {
//     res.send({
//         name: 'sandip',
//         age: 30
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('About page')
// })

app.listen(port, () => {
    console.log('Server is up on port' + port)
});