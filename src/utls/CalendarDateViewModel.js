export class CalendarDateViewModel {

    withinTheViewMonth = false;
    day = 0;
    weekday = 0;
    month = 0;
    year = 0;

    get key () {
      return [
        `${this.year}`.padStart(4, 0),
        `${this.month}`.padStart(2, 0),
        `${this.day}`.padStart(2, 0),
      ].join('')
    } 
  
    constructor(date, withinTheViewMonth) {
      this.withinTheViewMonth = withinTheViewMonth;
      this.day = date.getDate();
      this.weekday = date.getDay();
      this.month = date.getMonth();
      this.year = date.getFullYear();
      
    }
  }