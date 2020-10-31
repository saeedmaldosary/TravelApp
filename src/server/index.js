const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

var bodyParser = require('body-parser');
var cors = require('cors');

const fetch = require('node-fetch');

const app = express();

const port = 8081;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

app.use(cors())

app.use(express.static('dist'))

app.listen(port, function () {
    console.log('Example app listening on port ' + port)
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


//Fetch from Geonames
const geonamesURL = "http://api.geonames.org/searchJSON?maxRows=1&operator=OR&";
const geonamesUsername = process.env.geoUsername;

app.post('/geonames', fatchGeo);
async function fatchGeo(req, res) {
    const info = await fetch(geonamesURL + "&q=" + req.body.cityCode + "&username=" + geonamesUsername)
        .then((info) => info.json())
        .then(data => {
            //IF THERE IS ERROR CHECK NEXT LINE!!
            res.send(data.geonames[0])
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
};

//Fetch from weatherbit
const weatherbitURL = "http://api.weatherbit.io/v2.0/forecast/daily";
const weatherbitKEY = process.env.weatherbitKEY;

app.post('/weatherbit', fatchBit);
async function fatchBit(req, res) {
    const info = await fetch(weatherbitURL + "?lat=" + req.body.lat + "&lon=" + req.body.lng + "&key=" + weatherbitKEY)
        .then((info) => info.json())
        .then(data => {
            res.send(data.data[0])
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
};

//Fetch from pixabay
const pixabayURL = "https://pixabay.com/api/";
const pixabayKEY = process.env.pixKEY;

app.post('/pixabay', fatchPix);
async function fatchPix(req, res) {
    const info = await fetch(pixabayURL + "?q=" + req.body.cityName + "&image_type=photo&key=" + pixabayKEY)
        .then((info) => info.json())
        .then(data => {
            res.send(data.hits[0])
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
};
