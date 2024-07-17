import React from "react";
import EnvironmentItem from "@/app/components/environmentitem";

export default function Page({ params }) {
    const temperatureUrl = "https://api.example.com/temperature";
    const humidityUrl = "https://api.example.com/humidity";

    return (
        <div>
            <h1 style={{'margin-bottom': '1.5rem'}}>Studio environment</h1>
            <EnvironmentItem
                type='temperature'
                title="Temperature"
                url="https://io.adafruit.com/api/v2/dzaharia/feeds/temperature"/>
            <EnvironmentItem
                type='humidity'
                title="Humidity"
                url="https://io.adafruit.com/api/v2/dzaharia/feeds/humidity"/>
        </div>
    );
}
