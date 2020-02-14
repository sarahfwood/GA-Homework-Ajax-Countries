function init() {

  const countryList = document.querySelector('#countries')
  let countries = []

  function getCountries() {

    const countryFetch = fetch('https://restcountries.eu/rest/v2/all')
    countryFetch
      .then((resp) => resp.json())
      .then((resp) => {
        countries = resp
        displayCountries()
      })
      .catch(err => console.error(err))
  }

  function displayCountry(name, nativeName, flag) {
    return `<li>
      <h3>${name}</h3>
      <h6>${nativeName}</h6>
      <svg width="350" height="200"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">       
        <image xlink:href="${flag}" width="350" height="200"/>
      </svg>
    </li>`
  }

  function displayCountries() {
    countryList.innerHTML = ''
    const htmlArray = countries.map(country => {
      return displayCountry(country.name, country.nativeName, country.flag)
    })
    countryList.innerHTML = htmlArray.join('')
  }

  function displayCountriesByRegion(region) {
    countryList.innerHTML = ''
    const htmlArray = countries
      .filter(country => country.region === region)
      .map(country => {
        return displayCountry(country.name, country.nativeName, country.flag)
      })
    countryList.innerHTML = htmlArray.join('')
  }

  function displayCountriesByName(name) {
    countryList.innerHTML = ''
    const htmlArray = countries
      .filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
      .map(country => {
        return displayCountry(country.name, country.nativeName, country.flag)
      })
    countryList.innerHTML = htmlArray.join('')
  }

  const select = document.querySelector('select')
  select.addEventListener('change', () => {
    const region = select.value
    if (region === 'All') {
      displayCountries()
    } else {
      displayCountriesByRegion(region)
    }

  })
  const input = document.querySelector('input')
  input.addEventListener('input', () => {
    const text = input.value
    displayCountriesByName(text)
  })
  getCountries()
}

window.addEventListener('DOMContentLoaded', init)