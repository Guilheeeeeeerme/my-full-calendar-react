import { render } from '@testing-library/react';
import { useState } from 'react';
import { Component } from 'react';
import { Subject, takeUntil } from 'rxjs';
import { getRemindersForDate } from '../../services/reminder.service';
import { MyFullCalendarMonthlyCalendarDateReminders } from '../monthly-calendar-date-reminders/monthly-calendar-date-reminders.component';
import './monthly-calendar-date.styles.scss';

export class MyFullCalendarMonthlyCalendarDate extends Component {

    onAsyncDone$ = new Subject();

    constructor() {
        super();

        this.state = {
            reminders: []
        }
    }


    componentDidMount() {
        const { day, month, year } = this.props;
        this._loadAsyncData(day, month, year);
    }

    componentWillReceiveProps(nextProps) {
        const { day, month, year } = nextProps;
        this.setState({ reminders: [] });
        this._loadAsyncData(day, month, year);
    }

    componentWillUnmount() {
        this.onAsyncDone$.next()
    }

    _loadAsyncData(day, month, year) {
        getRemindersForDate(day, month + 1, year)
            .pipe(takeUntil(this.onAsyncDone$))
            .subscribe((reminders) => {
                this.setState({ reminders: reminders })
            })
    }

    render() {

        const { withinTheViewMonth, day, weekday, month, year, onSelectDate } = this.props;
        const { reminders } = this.state;

        const isWeekend = !(weekday % 6);

        const handleSelectDate = () => {
            onSelectDate && onSelectDate({
                withinTheViewMonth, day, weekday, month, year
            });
        }

        return (
            <div onClick={handleSelectDate}
                className={`my-calendar-datebox ${isWeekend ? "weekend" : ""} ${!withinTheViewMonth ? "not-month" : ""}`}>

                <div className="date-label-container">
                    <p className="date-label">{day}</p>
                </div>

                <MyFullCalendarMonthlyCalendarDateReminders
                    reminders={reminders}
                    day={day}
                    month={month}
                    year={year}
                />

            </div >
        );

    }

}