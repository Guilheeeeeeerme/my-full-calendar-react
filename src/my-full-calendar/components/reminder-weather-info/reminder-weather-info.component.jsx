import { Component } from "react";
import { getWeatherForecastByCity } from "../../services/open-weather.service";

export class ReminderWeatherInfo extends Component {

    abortController = new AbortController();;

    constructor() {
        super();

        this.state = {
            forecast: null
        }
    }

    setForecast(forecast) {
        this.setState({
            forecast: forecast
        })
    }

    loadForecast() {
        const { reminder } = this.props

        this.abortController?.abort();

        if (reminder?.location) {

            const [request, abortController] = getWeatherForecastByCity(reminder.location, reminder);

            this.abortController = abortController;

            request.subscribe((forecast) => {
                this.setForecast(forecast);
            })
        }
    }

    componentDidMount() {
        this.loadForecast();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.reminder.location !== prevProps.reminder.location 
            || this.props.reminder.date !== prevProps.reminder.date) {
            this.loadForecast();
        }
    }

    componentWillUnmount() {
        this.abortController?.abort();
    }

    render() {
        const { forecast } = this.state;
        let weather = '';

        if (forecast && forecast.main) {
            weather += `${forecast.main ? forecast.main?.temp + ' °C.' : ''}`;
            weather += ` ${forecast.weather[0]?.main}, ${forecast.weather[0]?.description}.`;
            if (forecast.main && forecast.main.temp_min && forecast.main.temp_max) {
                weather += ` Min ${forecast.main.temp_min} °C, Max ${forecast.main.temp_max} °C`;
            }
        } else {
            weather = 'No weather info available'
        }

        return (
            <div className="ReminderWeatherInfoContainer">{weather}</div>
        )
    }

}