console.log("CLient side JS rendering")

// fetch("http://puzzle.mead.io/puzzle").then(response => {
//     console.log("response data", response)
//     response.json().then(data => {
//         console.log("fetched and parse data", data)
//     })
// })

const fetchWeather = (location) => {
    fetch("http://localhost:3000/weather?address=" + location).then(response => {

        response.json().then((data) => {
            console.log(data)
            MsgOne.textContent = ''
            if (data.error) {
                console.log("error occured in fetching")
                MsgTwo.textContent = data.error
            } else {
                console.log("location", data.location);
                console.log("address", data.forecastData)
                MsgTwo.textContent = data.forecastData
              
            }
        })
    })
}

const weatherForm = document.querySelector('form');
const searchText = document.querySelector('input');
const MsgOne = document.querySelector('#MsgOne');
const MsgTwo = document.querySelector('#MsgTwo')
MsgOne.textContent = '';
MsgTwo.textContent = ''
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    MsgOne.textContent = "Loading....."
    MsgTwo.textContent = ''
    console.log("button clicked", searchText.value)
    if (searchText.value != undefined && searchText.value != null && searchText.value != '') {
        fetchWeather(searchText.value) 
    } else {
        console.log("Please enter the location");
        MsgTwo.textContent = "Please enter the location"
        MsgOne.textContent = ''
    }

})
