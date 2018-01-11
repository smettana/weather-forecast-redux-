import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';


class WeatherList extends Component {
    renderWeather=(cityData)=>{
        const name = cityData.city.name;
        const temps = _.map(cityData.list.map(weather=>weather.main.temp), (temp)=>temp-273);
        const pressures = _.map(cityData.list.map(weather=>weather.main.pressure), (pressure)=>pressure*0.750062);
        const humidities = cityData.list.map(weather=>weather.main.humidity);
        const lon = cityData.city.coord.lon;
        const lat = cityData.city.coord.lat;

        return(
            <tr key={name}>
                <td><GoogleMap lon={lon} lat={lat}/></td>
                <td><Chart color='orange' data={temps} units='&deg;C'/></td>
                <td><Chart color='green' data={pressures} units='mmHg'/></td>
                <td><Chart color='black' data={humidities} units='%'/></td>
            </tr>
        )
    }
    render(){
        return(
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (&deg;C)</th>
                        <th>Pressure (mmHg)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.weather.map(this.renderWeather)
                    }
                </tbody>
            </table>
        )
    }
}

// function mapStateToProps(state){
//     return{
//         weather:state.weather
//     }
// }
function mapStateToProps({weather}){
    return{weather}
}

export default connect(mapStateToProps, null)(WeatherList);