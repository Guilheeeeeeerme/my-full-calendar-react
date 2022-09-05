import AddIcon from '@mui/icons-material/Add';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import moment from 'moment';
import { Component } from 'react';
import { Subject, takeUntil } from 'rxjs';
import { getRemindersForDate } from '../../services/reminder.service';
import { AddReminder } from '../add-reminder/add-reminder.component';
import { CalendarDateReminders } from '../calendar-date-reminders/calendar-date-reminders.component';
import { EditReminder } from '../edit-reminder/edit-reminder.component';

export class CalendarDate extends Component {

    onAsyncDone$ = new Subject();

    constructor() {
        super();

        this.state = {
            openAddReminder: false,
            openEditReminder: false,
            selectedReminder: null,
            reminders: []
        }
    }

    componentDidMount() {
        const { day, month, year } = this.props;
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

                if ((newReminders?.map(x => x.id).sort().join()) !== (reminders?.map(x => x.id).sort().join())) {
                    this.setState({
                        reminders: newReminders
                    })
                }
            })
    }

    selectReminder(reminder) {
        this.setState({
            openEditReminder: true,
            selectedReminder: reminder
        })
    }


    onDeleteReminder(reminder) {
        const { onReminderDeleted } = this.props;

        this.setState({
            openEditReminder: false,
            selectedReminder: null
        })

        if (reminder) {
            this.initReminders();
            onReminderDeleted && onReminderDeleted(reminder.id);
        }
    }

    onCloseAddReminder(reminder) {
        const { onReminderAdded } = this.props;

        this.setState({
            openAddReminder: false,
            selectedReminder: null
        })

        if (reminder) {
            this.initReminders();
            onReminderAdded && onReminderAdded(reminder);
        }
    }

    onCloseEditReminder(reminder) {
        const { onReminderEdited } = this.props;

        this.setState({
            openEditReminder: false,
            selectedReminder: null
        })

        if (reminder) {
            this.initReminders();
            onReminderEdited && onReminderEdited(reminder);
        }
    }

    handleClickAddReminder() {

        const { day, month, year } = this.props;
        let now = new Date(year, month, day);
        const date = moment(now).format('YYYY-MM-DD');

        this.setState({
            openAddReminder: true,
            selectedReminder: {
                date
            }
        })
    }

    render() {

        const { withinTheViewMonth, day, weekday, month, year } = this.props;
        const { reminders, openAddReminder, openEditReminder, selectedReminder } = this.state;

        const isWeekend = !(weekday % 6);

        return (

            <Card className={`my-calendar-datebox ${isWeekend ? "weekend" : ""} ${!withinTheViewMonth ? "not-month" : ""}`}>

                <CardActions className="date-label-container">
                    <Button size="small" variant="text"
                        aria-label='Add reminder button'
                        onClick={this.handleClickAddReminder}
                        endIcon={<AddIcon />}>{day}</Button>
                </CardActions>

                <CardContent className="reminders-container">
                    <CalendarDateReminders
                        reminders={reminders}
                        day={day}
                        month={month}
                        year={year}
                        onSelectReminder={this.selectReminder}
                    />
                </CardContent>

                {
                    openEditReminder && (<EditReminder
                        open={openEditReminder}
                        reminder={selectedReminder}
                        onDelete={this.onDeleteReminder}
                        onClose={this.onCloseEditReminder} />)
                }

                {
                    openAddReminder && (<AddReminder
                        open={openAddReminder}
                        reminder={selectedReminder}
                        onClose={this.onCloseAddReminder} />)
                }

            </Card>


        );

    }

}