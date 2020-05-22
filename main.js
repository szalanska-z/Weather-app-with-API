const form = document.querySelector('form');
const input = document.querySelector('input.search-input');
let city = document.querySelector('.location div.city');
let date = document.querySelector('.location div.date');
let temp = document.querySelector('.current div.temp');
let weather = document.querySelector('.current div.weather-condition');
let hiLow = document.querySelector('.current div.hi-low');
let pressure = document.querySelector('.current div.pressure')
let iconWeather = document.querySelector('.current .weather-icon')

const api = {
	key: '3bbfe89df99e9668ea3cd49db1805816',
	base: "https://api.openweathermap.org/data/2.5/"
}

const searchInput = (e) => {
	e.preventDefault();
	const textInput = input.value;
	if (textInput === "") {
		return alert('Nie wpisałeś żadnego miasta')
	} else {
		getResult(textInput)
	}
	input.value = "";
}

const getResult = (city) => {
	fetch(`${api.base}weather?q=${city}&appid=${api.key}&units=metric&lang=pl`)
		.then(response => {
			if (response.ok) {
				return response
			}
			throw Error(response.status);
		})
		.then(response => response.json())
		.then(displayResults)
}

const displayResults = (response) => {
	console.log(response);

	let nowDate = new Date();

	city.innerText = `${response.name}, ${response.sys.country}`;
	temp.innerHTML = `${Math.round(response.main.temp)}<span>&#176C</span>`
	date.innerText = dataBuilder(nowDate);
	weather.innerText = response.weather[0].main
	iconWeather.src = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`
	hiLow.innerText = `${Math.round(response.main.temp_min)}\xB0C / ${Math.round(response.main.temp_max)}\xB0C`
	pressure.innerText = `${response.main.pressure} hPa`
}

const dataBuilder = (nowDate) => {
	let days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

	let months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

	let date = nowDate.getDate();
	// console.log(date);
	let day = days[nowDate.getDay()];
	let month = months[nowDate.getMonth()];
	let year = nowDate.getFullYear();


	return `${day} ${date} ${month} ${year}`
}


const initialConditions = () => {

	let cities = ['Warszawa', 'Nowy Jork', 'Miami', 'Helsinki', 'Barcelona', 'Mediolan', 'Berlin', 'Wuhan', 'Floryda', 'Kraków', 'Rzeszów']

	const indexCities = Math.floor(Math.random() * cities.length);
	getResult(cities[indexCities])

}

initialConditions()


form.addEventListener('submit', searchInput)