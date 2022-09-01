import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import moment from "moment";
import React, { useState } from 'react';
import { MyFullCalendarAddReminder } from "../add-reminder/add-reminder.component";
import { MyFullCalendarMonthlyCalendarDate } from "../monthly-calendar-date/monthly-calendar-date.component";
import './monthly-calendar.styles.scss';

export const MyFullCalendarMonthlyCalendar = ({ month, year }) => {

    const [openAddReminder, setOpenAddReminder] = useState(false);

    if (month == null)
        throw '"month" is required';

    if (year == null)
        throw '"year" is required';

    const monthLabel = moment(new Date(year, month, 1)).format('MMMM YYYY');

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
        datesInMonth.push({
            withinTheViewMonth: viewMonthStartsAt.getMonth() == month,
            day: viewMonthStartsAt.getDate(),
            weekday: viewMonthStartsAt.getDay(),
            month: viewMonthStartsAt.getMonth(),
            year: viewMonthStartsAt.getFullYear(),
        })
        viewMonthStartsAt.setDate(viewMonthStartsAt.getDate() + 1);
    }

    const selectDate = (selectedDate) => {
        // debugger;
    }

    const handleClickAddReminder = () => {
        setOpenAddReminder(true);
    };

    const onCloseAddReminder = (reminder) => {
        setOpenAddReminder(false);
    };

    function getKey(dateInMonth) {
        return [
            `${dateInMonth.year}`.padStart(4, 0),
            `${dateInMonth.month}`.padStart(2, 0),
            `${dateInMonth.day}`.padStart(2, 0),
        ].join('')
    }

    return (
        <div className="MyFullCalendarMonthlyCalendarContainer">

            <h3> {monthLabel} </h3>

            <Button variant="text"
                aria-label='Add reminder button'
                onClick={handleClickAddReminder}
                endIcon={<AddIcon />}>New Reminder</Button>

            <div className="MyFullCalendarMonthlyCalendarWeekdays">
                {weekDays.map(weekDay => (
                    <div key={weekDay} className="MyFullCalendarMonthlyCalendarWeekdayValue">{weekDay}</div>
                ))}
            </div>

            <div className="MyFullCalendarMonthlyCalendarDateValues">
                {datesInMonth.map(dateInMonth => (
                    <MyFullCalendarMonthlyCalendarDate
                        key={getKey(dateInMonth)}
                        withinTheViewMonth={dateInMonth.withinTheViewMonth}
                        day={dateInMonth.day}
                        weekday={dateInMonth.weekday}
                        month={dateInMonth.month}
                        year={dateInMonth.year}
                        onSelectDate={selectDate}
                    />
                ))}
            </div>

            <MyFullCalendarAddReminder
                open={openAddReminder}
                onClose={onCloseAddReminder} />

        </div>
    );

}