export class ReminderViewModel {

  constructor(
    id,
    reminder,
    city,
    date,
    time,
    weatherInfo,
    color,
  ) {

    this.id = id;
    this.reminder = reminder;
    this.city = city;
    this.date = date;
    this.time = time;
    this.weatherInfo = weatherInfo;
    this.color = color;
  }
}