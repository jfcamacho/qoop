import { useEffect, useState } from "react";
import Config from "../config/config";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useGlobalContext } from "../config/GlobalContext";




const Dashboard = () => {

    const { isSubscribed} = useGlobalContext();
    const [city, setCity] = useState("Loja");
    const [weather, setWeather] = useState({
        location: {
            name: "",
            region: "",
            country: ""
        },
        current: {
            temp_c: "",
            humidity: "",
            wind_kph: "",
            condition: {
                icon: "",
                text: ""
            }
        }
    });
    const [error, setError] = useState("");

    useEffect( () => {

        const fetchWeather = async () => {
            try {
                const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${Config.WEATHER_API}&q=${city}`
                );
                if (!response.ok) throw new Error("City not found");
                const data = await response.json();
                setWeather(data);
                setError("");
            } catch (err: any) {
                setError(err.message);
                // setWeather();
            }
        }
        fetchWeather()
    }, [city])


    const header = (
        <img alt="Card" src="/images/image.png" />
    );

    const headerPlus = (icon: string, title: string) => {
        return (
        <div className="flex justify-content-between align-items-center h-2rem">
            <h3>{title}</h3>
            <i className={icon} style={{ fontSize: '2rem' }}></i>

        </div>
        )
    }

    return(
        <>
        <div className="grid">
            <div className="col-4">
                <Card title="Weather App" subTitle="Check the weather in your city" header={header} className="px-5 surface-200">
                    <InputText placeholder="Enter city name" name='city' className="w-full" onChange={(e) => setCity(e.target.value)}/>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {weather && isSubscribed && (
                        <div style={{ textAlign: "center" }}>
                            <h2>{weather.location.name}, {weather.location.country}</h2>
                            <p>
                            <strong>Temperature:</strong> {weather.current.temp_c}°C
                            </p>
                            <p>
                            <strong>Condition:</strong> {weather.current.condition.text}
                            </p>
                            <img
                            src={weather.current.condition.icon}
                            alt={weather.current.condition.text}
                            style={{ width: "100px", height: "100px" }}
                            />
                            <p>
                            <strong>Humidity:</strong> {weather.current.humidity}%
                            </p>
                            <p>
                            <strong>Wind Speed:</strong> {weather.current.wind_kph} kph
                            </p>
                        </div>
                    )}
                </Card>
            </div>
            <div className="col-8 flex justify-content-between">
                <Card className="w-20rem h-10rem bg-green-300" title={headerPlus('pi pi-list', 'Projects')}>
                    <p>SOME PROJECTS</p>
                </Card>
                <Card className="w-20rem h-10rem bg-yellow-400" title={headerPlus('pi pi-objects-column', 'Tasks')}>
                    <p>SOME PROJECTS</p>
                </Card>
                <Card className="w-20rem h-10rem bg-red-300" title={headerPlus('pi pi-users', 'Users')}>
                    <p>SOME PROJECTS</p>
                </Card>
            </div>
        
        </div>
        </>
    )
}

export default Dashboard