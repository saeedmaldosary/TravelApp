async function dataPost(path, data) {
    const response = await fetch('http://localhost:8081/' + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return await response.json();
}

//Fetch from Geonames
async function cityCode(cityCode) {
    let data = {
        'cityCode': cityCode
    }
    return await dataPost(`geonames`, data);
}

//Fetch from weatherbit
async function cityWeather(lng, lat) {
    let data = {
        'lat': lat,
        'lng': lng
    }
    return await dataPost(`weatherbit`, data);
}

//Fetch from pixabay
async function fetchPics(cityName) {
    let data = {
        'cityName': cityName
    }
    return await dataPost(`pixabay`, data);
}

//Results function

async function getData(event) {
    event.preventDefault();

    let flightFrom = document.getElementById("fromCity").value;
    let flightTo = document.getElementById("flightTo").value;
    let flightDate = document.getElementById("flightDate").value;
    let flightEnd = document.getElementById("flightEnd").value;

    document.getElementById("resultsCon").style.display = "block";

    let geoData = await cityCode(flightTo);
    let lat = geoData.lat;
    let lng = geoData.lng;

    let weatherData = await cityWeather(lng, lat);
    let maxTemp = weatherData.max_temp;
    let lowTemp = weatherData.low_temp;

    let pixData = await fetchPics(flightTo);
    let imgURL = pixData.webformatURL;

    document.getElementById("flight_From").innerHTML = "Flight from " + flightFrom;
    document.getElementById("flight_To").innerHTML = "Flight to " + flightTo;
    document.getElementById("flight_Date").innerHTML = "Flight date " + flightDate;
    document.getElementById("flight_End").innerHTML = "Flight end " + flightEnd;
    document.getElementById("maxTemp").innerHTML = "Maximum temp " + maxTemp + "c";
    document.getElementById("lowTemp").innerHTML = "Lowest temp " + lowTemp + "c";
    document.getElementById("pixImg").src = imgURL;

}

//Remove flight fuction

async function removeFlight(event) {
    event.preventDefault();

    document.getElementById("fromCity").value = "";
    document.getElementById("flightTo").value = "";
    document.getElementById("flightDate").value = "";
    document.getElementById("flightEnd").value = "";
    document.getElementById("resultsCon").style.display = "none";

}

export {
    getData,
    removeFlight
};