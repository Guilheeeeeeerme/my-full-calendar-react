export class CalendarDateViewModel {

  withinTheViewMonth = false;
  day = 0;
  weekday = 0;
  month = 0;
  year = 0;

  constructor(date, withinTheViewMonth) {
    this.withinTheViewMonth = withinTheViewMonth;
    this.day = date.getDate();
    this.weekday = date.getDay();
    this.month = date.getMonth();
    this.year = date.getFullYear();
  }

}