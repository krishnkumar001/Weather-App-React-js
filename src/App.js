import axios from 'axios'
import { useState } from 'react'


export default function App() {

    //states
    const [enteredValue, setEnteredValue] = useState("")
    const [degree, setDegree] = useState("0");
    const [city, setCity] = useState("France");
    const [weather, setWeather] = useState("Raining");
    const [humidity, setHumidity] = useState("0")
    const [windDeg, setWindDeg] = useState("0")
    const [windSpeed, setWindSpeed] = useState("0k")

    //axios
    const getData = () => {
        const weather = axios(`https://api.openweathermap.org/data/2.5/weather?q=${enteredValue}&appid=9e962064b012297a53f88edf908310c2`)
        weather.then((responseData) => {
            console.log(responseData.data)

            //update the state with api to get datas
            setDegree(responseData.data.main.temp)
            setCity(responseData.data.name)
            setWeather(responseData.data.weather[0].description)
            setHumidity(responseData.data.main.humidity)
            setWindDeg(responseData.data.wind.deg)
            setWindSpeed(responseData.data.wind.speed)

        }).catch((error) => {
            console.error('Error fetching data', error)
            alert("Did not have such city!")
        })

    }

    //function for handleinput
    const handleInputChange = (event) => {
        // console.log(event.target.value)
        setEnteredValue(event.target.value);
    }

    return (
        <div className="flex flex-row justify-center h-[100vh] items-center ">
            <div className="p-2 rounded-md shadow" style={{ backgroundImage: "linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)" }}>
                <h1 className="font-medium text-center">Hey! 🌦️</h1>
                <p className='text-center'>Do you want to know the weather Report:)</p>
                <input onChange={handleInputChange} type="text" className="w-[60vh] rounded-md h-6 text-sm mt-2 p-5 outline-sky-100 " placeholder="City Name?"></input>
                <br />
                <div className='text-center'><button onClick={getData} className="bg-black text-white rounded-lg p-2 text-xs mt-2">Get Report🌩️</button></div>
                <div className='border mt-2 mb-2'>
                    <p className='text-center  mt-2 p-2 border-radius: 0.25rem border-style: solid' >Temperature: {degree} | city: {city} | weather: {weather} | humidity: {humidity}</p>
                    <p className='text-center mb-2'>Wind: deg-{windDeg} Speed-{windSpeed}</p>
                </div>
            </div>
        </div>
    )
}