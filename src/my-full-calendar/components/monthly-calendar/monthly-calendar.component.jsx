import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import moment from "moment";
import React, { Component } from 'react';
import { Subject } from 'rxjs';
import { AddReminder } from "../add-reminder/add-reminder.component";
import { CalendarDate } from "../calendar-date/calendar-date.component";
import './monthly-calendar.styles.scss';

export class MonthlyCalendar extends Component {

    onReminderEdited$ = new Subject();

    weekDays = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ]

    constructor() {
        super();

        this.state = {
            openAddReminderDialog: false,
            mockOpenDialogReminderTemplate: null,
            datesInMonth: [],
            monthLabel: ''
        }
    }

    componentDidMount() {
        const { month, year } = this.props;
        this.initDatesInMonth(month, year)
    }

    componentDidUpdate(prevProps) {
        const { month, year } = this.props;
        if (month != prevProps.month || year != prevProps.year) {
            this.initDatesInMonth(month, year);
        }
    }

    initDatesInMonth = (month, year) => {

        if (month == null)
            throw Error('"month" is required');

        if (year == null)
            throw Error('"year" is required');

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

    setOpenAddReminder = (openAddReminderDialog) => {

        let now = new Date();
        const { month, year } = this.props;

        now.setMonth(month);
        now.setFullYear(year);
        now.setHours(now.getHours() + 1);

        const date = moment(now).format('YYYY-MM-DD');
        const time = moment(now).format('HH:mm');

        this.setState({
            openAddReminderDialog: openAddReminderDialog,
            mockOpenDialogReminderTemplate: {
                date,
                time
            }
        })
    }

    handleClickAddReminder = () => {
        this.setOpenAddReminder(true);
    };

    onCloseAddReminder = (reminder) => {
        this.setOpenAddReminder(false);
    };

    reminderEdited = (reminder) => {
        this.onReminderEdited$.next(reminder);
    }

    getKey = (dateInMonth) => {
        return [
            `${dateInMonth.year}`.padStart(4, 0),
            `${dateInMonth.month - 1}`.padStart(2, 0),
            `${dateInMonth.day}`.padStart(2, 0),
        ].join('-')
    }

    render() {
        const { monthLabel, datesInMonth, openAddReminderDialog, mockOpenDialogReminderTemplate } = this.state;

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
                        <CalendarDate
                            key={this.getKey(dateInMonth)}
                            withinTheViewMonth={dateInMonth.withinTheViewMonth}
                            day={dateInMonth.day}
                            weekday={dateInMonth.weekday}
                            month={dateInMonth.month}
                            year={dateInMonth.year}
                            maxReminders={3}
                            onReminderEditedListener={this.onReminderEdited$}
                            onEditReminder={this.reminderEdited}
                        />
                    ))}
                </div>

                {
                    openAddReminderDialog && (<AddReminder
                        open={openAddReminderDialog}
                        reminder={mockOpenDialogReminderTemplate}
                        onClose={this.onCloseAddReminder} />)
                }

            </div>
        );
    }

}