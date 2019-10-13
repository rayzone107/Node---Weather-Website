
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    fetchForecast(search.value)
})

const fetchForecast = (address) => {
    message1.textContent = 'Fetching Forecast...'
    message2.textContent = ''
    fetch('http://localhost:3000/weather?address=' + address)
        .then(response => {
            response.json().then((data) => {
                if (data.error) {
                    return message1.textContent = data.error
                }
                message1.textContent = data.location
                message2.textContent = data.forecast
            })
        })
}
