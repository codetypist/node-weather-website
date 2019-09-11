const path = require ('path')
const express = require ('express')
const hbs = require ('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// define path for express configuration
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath= path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'John Smith'
    })
})

    
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Page',
        name: 'John Smith'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        helpText:'If you have questions, you may find information here.',
        name: 'John Smith'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    } 

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error: 'The search term contains an error.'
            })
        } 
        
            forecast (latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send ({
                    error
                })
            }
            res.send ({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
    
})

// app.get('/weather', (req, res)=>{
//     if(!req.query.address){
//         return res.send({
//             error: 'You must provide an address.'
//         })
//     } 

//     geocode(req.query.address, (error, data)=>{
//         if(error){
//             return res.send({
//                 error: 'The search term contains an error.'
//             })
//         } else if (data==undefined){
//             return res.send({
//                 error: 'There is no weather data for the address you provided'
//             })
//         }
        
//             forecast (data.latitude, data.longitude, (error, forecastData)=>{
//             if(error){
//                 return res.send ({
//                     error
//                 })
//             }
//             res.send ({
//                 forecast: forecastData,
//                 location: data.location,
//                 address: req.query.address
//             })
//         })
//     })
    
    
// })


app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })        
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})



app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 'Error Page',
        errorText:'The Help article you are searching is not available.',
        name: 'John Smith'
    })
})


app.get('*', (req, res)=>{
    res.render('404', {
        title: 'Error Page',
        errorText:'The page you are searching is not available.',
        name: 'John Smith'
    })
})

app.listen(port, ()=> {
    console.log('Server is up on port '+port)
})