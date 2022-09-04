import { Component } from 'react';
import { Subject, takeUntil } from 'rxjs';
import { getRemindersForDate } from '../../services/reminder.service';
import { CalendarDateReminders } from '../calendar-date-reminders/calendar-date-reminders.component';
import './calendar-date.styles.scss';

export class CalendarDate extends Component {

    onAsyncDone$ = new Subject();

    constructor() {
        super();

        this.state = {
            reminders: []
        }
    }


    componentDidMount() {
        console.log('componentDidMount MyFullCalendarMonthlyCalendarDate');
        const { day, month, year } = this.props;
        this._loadAsyncData(day, month, year);
    }

    componentDidUpdate(nextProps) {
        const { day, month, year } = nextProps;
        // console.log(`componentDidUpdate MyFullCalendarMonthlyCalendarDate ${year}-${month}-${day}`);
        // this.setState({ reminders: [] });
        // this._loadAsyncData(day, month, year);
    }



    componentWillUnmount() {
        console.log('componentWillUnmount MyFullCalendarMonthlyCalendarDate');
        this.onAsyncDone$.next()
    }

    _loadAsyncData(day, month, year) {
        this.onAsyncDone$.next()

        getRemindersForDate(day, month + 1, year)
            .pipe(takeUntil(this.onAsyncDone$))
            .subscribe((reminders) => {
                this.setState({ reminders: reminders })
            })
    }

    selectReminder = (reminder) => {
        console.log(reminder);
    }

    render() {

        const { withinTheViewMonth, day, weekday, month, year } = this.props;
        const { reminders } = this.state;

        const isWeekend = !(weekday % 6);

        return (
            <div
                className={`my-calendar-datebox ${isWeekend ? "weekend" : ""} ${!withinTheViewMonth ? "not-month" : ""}`}>

                <div className="date-label-container">
                    <p className="date-label">{day}</p>
                </div>

                <CalendarDateReminders
                    reminders={reminders}
                    day={day}
                    month={month}
                    year={year}
                    onSelectReminder={this.selectReminder}
                />

            </div >
        );

    }

}