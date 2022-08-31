export class ReminderViewModel {

  constructor(
    id,
    name,
    city,
    date,
    time,
    weatherInfo,
    color,
  ) {

    this.id = id;
    this.name = name;
    this.city = city;
    this.date = date;
    this.time = time;
    this.weatherInfo = weatherInfo;
    this.color = color;
  }
}