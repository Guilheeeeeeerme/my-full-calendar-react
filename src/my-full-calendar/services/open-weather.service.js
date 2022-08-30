import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OPENWEATHER_API, OPENWEATHER_TOKEN } from 'src/environments/urls';
import { ReminderDateViewModel } from './viewModels/reminderDateViewModel';

const environment = {
    openWeatherToken: 'c9525f81a25a9392949a36f0ec4d06de',
    openWeatherApiUrl: 'https://api.openweathermap.org/data/2.5',
};

function filterMostRecent(forecastRes, date) {

    let forecast = forecastRes.list.filter((x) => {
        let dt = new Date(x.dt * 1000);
        return dt.getFullYear() == date.year
            && dt.getMonth() + 1 == date.month
            && dt.getDate() == date.day;
    })

    if (forecast && forecast.length)
        return forecast[forecast.length - 1];

    return null;

}

export function getWeatherForecast (city_name, date) {

    return new Promise((resolve, reject) => {

        const request = this.http.get(
            `${OPENWEATHER_API}/forecast`, {
            params: {
                q: city_name,
                units: 'metric',
                appid: OPENWEATHER_TOKEN
            }
        });

        request.subscribe((res) => {
            resolve(this.filterMostRecent(res, date))
        }, reject);

    });

}

