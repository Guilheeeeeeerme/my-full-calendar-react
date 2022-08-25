import moment from "moment";
import { Component } from "react";
import { CalendarDateViewModel } from "../../../utls/CalendarDateViewModel";
import { MyFullCalendarMonthlyCalendarDate } from "../monthly-calendar-date/monthly-calendar-date.component";
import './monthly-calendar.styles.scss';

export const MyFullCalendarMonthlyCalendar = ({ month, year }) => {

    if (month == null)
        throw '"month" is required';

    if (year == null)
        throw '"year" is required';

    const dateLabel = moment(new Date(year, month, 1)).format('MMMM YYYY');

    const weekDays = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ]

    const datesInMonth = [];

    let viewMonthStartsAt = new Date(year, month, 1);
    let viewMonthEndsAt = new Date(year, month + 1, 0);

    // fill the left side until sunday
    while (viewMonthStartsAt.getDay() != 0) {
        viewMonthStartsAt.setDate(viewMonthStartsAt.getDate() - 1);
    }

    // fill the right side until saturday
    while (viewMonthEndsAt.getDay() != 6) {
        viewMonthEndsAt.setDate(viewMonthEndsAt.getDate() + 1);
    }

    while (viewMonthStartsAt <= viewMonthEndsAt) {
        datesInMonth.push(new CalendarDateViewModel(viewMonthStartsAt, viewMonthStartsAt.getMonth() == month));
        viewMonthStartsAt.setDate(viewMonthStartsAt.getDate() + 1);
    }

    return (
        <div className="MyFullCalendarMonthlyCalendarContainer">

            <h3> {dateLabel} </h3>

            <div className="MyFullCalendarMonthlyCalendarWeekdays">
                {weekDays.map(weekDay => (
                    <div className="MyFullCalendarMonthlyCalendarWeekdayValue">{weekDay}</div>
                ))}
            </div>

            <div className="MyFullCalendarMonthlyCalendarDateValues">
                {datesInMonth.map(dateInMonth => (
                    <MyFullCalendarMonthlyCalendarDate
                        key={dateInMonth.key}
                        withinTheViewMonth={dateInMonth.withinTheViewMonth}
                        day={dateInMonth.day}
                        weekday={dateInMonth.weekday}
                        month={dateInMonth.month}
                        year={dateInMonth.year}
                    />
                ))}
            </div>
        </div>
    );

}