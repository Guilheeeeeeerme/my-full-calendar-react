
import { environment } from '../../environments/enviroment';
import { Observable } from 'rxjs';
import moment from 'moment/moment';

function filterMostRecent(forecasts, reminder) {
    return forecasts?.list?.filter((forecast) => {
        const date_str = moment(new Date(forecast.dt * 1000)).format('YYYY-MM-DD');
        return date_str === reminder.date;
    }).pop();
}

export function getWeatherForecastByCity(city_name, reminder) {

    const abortController = new AbortController();
    const observable = new Observable((subscriber) => {

        const { signal } = abortController;

        const params = {
            q: city_name,
            units: 'metric',
            appid: environment.openWeatherToken
        }

        fetch(
            `${environment.openWeatherApiUrl}/forecast?${new URLSearchParams(params)}`,
            { signal: signal })
            .then((response) => response.json())
            .then((forecasts) => filterMostRecent(forecasts, reminder))
            .then((forecast) => {
                subscriber.next(forecast);
                subscriber.complete();
            });

    })


    return [observable, abortController];

}

