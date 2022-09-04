import { Component } from 'react';
import { Subject, takeUntil } from 'rxjs';
import { getRemindersForDate } from '../../services/reminder.service';
import { CalendarDateReminders } from '../calendar-date-reminders/calendar-date-reminders.component';
import { EditReminder } from '../edit-reminder/edit-reminder.component';
import './calendar-date.styles.scss';

export class CalendarDate extends Component {

    onAsyncDone$ = new Subject();

    constructor() {
        super();

        this.state = {
            openEditReminder: false,
            selectedReminder: null,
            reminders: []
        }
    }

    componentDidMount() {
        const { day, month, year } = this.props;
        this.initReminders(day, month, year);
    }

    componentDidUpdate(nextProps) {
        const { day, month, year } = nextProps;
        this.initReminders(day, month, year);
    }

    componentWillUnmount() {
        this.onAsyncDone$.next()
    }

    initReminders(day, month, year) {
        this.onAsyncDone$.next()

        getRemindersForDate(day, month + 1, year)
            .pipe(takeUntil(this.onAsyncDone$))
            .subscribe((newReminders) => {
                const { reminders } = this.state;

                if ((newReminders?.map(x => x.id).sort().join()) != (reminders?.map(x => x.id).sort().join())) {
                    this.setState({
                        reminders: newReminders
                    })
                }
            })
    }

    selectReminder = (reminder) => {
        this.setState({
            openEditReminder: true,
            selectedReminder: reminder
        })
    }

    onDeleteReminder = (reminderId) => {
        if (reminderId) {
            const { reminders } = this.state;

            this.setState({
                openEditReminder: false,
                selectedReminder: null,
                reminders: reminders.filter(reminder => {
                    return reminder.id != reminderId;
                })
            })
        }
    }

    onCloseEditReminder = (updatedReminder) => {
        if (updatedReminder) {
            const { reminders } = this.state;

            this.setState({
                openEditReminder: false,
                selectedReminder: null,
                reminders: reminders.map(reminder => {
                    if (reminder.id == updatedReminder.id) {
                        return {
                            ...reminder,
                            ...updatedReminder,
                        }
                    } else {
                        return reminder;
                    }
                })
            })
        } else {

            this.setState({
                openEditReminder: false,
                selectedReminder: null
            })
        }
    }

    render() {

        const { withinTheViewMonth, day, weekday, month, year } = this.props;
        const { reminders, openEditReminder, selectedReminder } = this.state;

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

                {
                    openEditReminder && (<EditReminder
                        open={openEditReminder}
                        reminder={selectedReminder}
                        onDelete={this.onDeleteReminder}
                        onClose={this.onCloseEditReminder} />)
                }

            </div >
        );

    }

}