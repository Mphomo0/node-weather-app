const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handelbars and views loation
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        Title: 'Weather App',
        Name: 'Mpho'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        Title: 'About Me',
        Name: 'Mpho'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        Title: 'Help',
        Message: 'Mpho'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if(error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
    
            if(error) {
                return res.send({error})
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        Title: '404',
        Name: 'Andrew Mead',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        Title: '404',
        Name: 'Andrew Mead',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('App is running in port 3000')
})