import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { render } from '@testing-library/react';
import moment from "moment";
import React, { Component, useEffect, useState } from 'react';
import { MyFullCalendarAddReminder } from "../add-reminder/add-reminder.component";
import { MyFullCalendarMonthlyCalendarDate } from "../monthly-calendar-date/monthly-calendar-date.component";
import './monthly-calendar.styles.scss';

export class MyFullCalendarMonthlyCalendar extends Component {

    weekDays = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ]

    constructor() {
        super();

        this.state = {
            openAddReminder: false,
            datesInMonth: [],
            monthLabel: ''
        }
    }

    componentDidMount() {
        const { month, year } = this.props;
        this.initDatesInMonth(month, year)
    }

    componentWillReceiveProps(nextProps) {
        const { month, year } = nextProps;

        if (month != this.props.month || year != this.props.year) {
            this.initDatesInMonth(month, year);
        }

    }

    initDatesInMonth = (month, year) => {

        if (month == null)
            throw '"month" is required';

        if (year == null)
            throw '"year" is required';

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

        const monthLabel = moment(new Date(year, month, 1)).format('MMMM YYYY');

        this.setState({
            datesInMonth: datesInMonth,
            monthLabel: monthLabel,
        })


    }

    selectDate = (selectedDate) => {
        // debugger;
    }

    setOpenAddReminder(openAddReminder) {
        this.setState({
            openAddReminder: openAddReminder
        })
    }

    handleClickAddReminder = () => {
        this.setOpenAddReminder(true);
    };

    onCloseAddReminder = (reminder) => {
        this.setOpenAddReminder(false);
    };

    getKey(dateInMonth) {
        return [
            `${dateInMonth.year}`.padStart(4, 0),
            `${dateInMonth.month - 1}`.padStart(2, 0),
            `${dateInMonth.day}`.padStart(2, 0),
        ].join('-')
    }

    render() {
        const { monthLabel, datesInMonth, openAddReminder } = this.state;

        return (
            <div className="MyFullCalendarMonthlyCalendarContainer">

                <h3> {monthLabel} </h3>

                <Button variant="text"
                    aria-label='Add reminder button'
                    onClick={this.handleClickAddReminder}
                    endIcon={<AddIcon />}>New Reminder</Button>

                <div className="MyFullCalendarMonthlyCalendarWeekdays">
                    {this.weekDays.map(weekDay => (
                        <div key={weekDay} className="MyFullCalendarMonthlyCalendarWeekdayValue">{weekDay}</div>
                    ))}
                </div>

                <div className="MyFullCalendarMonthlyCalendarDateValues">
                    {datesInMonth.map(dateInMonth => (
                        <MyFullCalendarMonthlyCalendarDate
                            key={this.getKey(dateInMonth)}
                            withinTheViewMonth={dateInMonth.withinTheViewMonth}
                            day={dateInMonth.day}
                            weekday={dateInMonth.weekday}
                            month={dateInMonth.month}
                            year={dateInMonth.year}
                            onSelectDate={this.selectDate}
                        />
                    ))}
                </div>

                <MyFullCalendarAddReminder
                    open={openAddReminder}
                    onClose={this.onCloseAddReminder} />

            </div>
        );
    }

}