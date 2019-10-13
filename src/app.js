const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define path for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rachit Goyal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rachit Goyal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rachit Goyal',
        helpText: 'Help Message'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) return res.send(error)

        forecast(lat, long, (error, { summary, temp, rainPercentage } = {}) => {
            if (error) return res.send(error)

            return res.send({
                forecast: summary + " It is currently " + temp + " degrees. There is a " + rainPercentage + "% chance of rain.",
                location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Rachit Goyal',
        text404: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Rachit Goyal',
        text404: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
