import AddIcon from '@mui/icons-material/Add';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import moment from 'moment';
import { Component } from 'react';
import { filter, Subject, takeUntil } from 'rxjs';
import { getRemindersForDate } from '../../services/reminder.service';
import { AddReminder } from '../add-reminder/add-reminder.component';
import { CalendarDateReminders } from '../calendar-date-reminders/calendar-date-reminders.component';
import { EditReminder } from '../edit-reminder/edit-reminder.component';
import { ShowMore } from '../show-more/show-more.component';

export class CalendarDate extends Component {

    onAsyncDone$ = new Subject();
    onEditSubscriber$ = new Subject();

    constructor() {
        super();

        this.state = {
            openAddReminderDialog: false,
            openEditReminderDialog: false,
            openShowMoreDialog: false,
            selectedReminder: null,
            reminders: []
        }
    }

    componentDidMount() {
        const { onReminderEditedListener } = this.props;

        const { day, month, year } = this.props;
        this.reminderDateFilter = moment(new Date(year, month, day)).format('YYYY-MM-DD');

        this.onEditSubscriber$ = onReminderEditedListener
            .pipe(filter((reminder) => {
                return reminder.date == this.reminderDateFilter;
            }))
            .subscribe(() => {
                this.initReminders(true);
            })

        this.initReminders();
    }

    componentWillUnmount() {
        this.onAsyncDone$.next()
        this.onEditSubscriber$.unsubscribe();
    }

    initReminders = (forceUpdate) => {
        const { day, month, year } = this.props;

        this.onAsyncDone$.next()

        getRemindersForDate(day, month + 1, year)
            .pipe(takeUntil(this.onAsyncDone$))
            .subscribe((newReminders) => {
                const { reminders } = this.state;

                if (forceUpdate || (newReminders?.map(x => x.id).sort().join()) !== (reminders?.map(x => x.id).sort().join())) {
                    this.setState({
                        reminders: newReminders
                    })
                }
            })
    }


    deleteReminder = (reminder) => {

        this.setState({
            openEditReminderDialog: false
        })

        if (reminder) {
            this.initReminders();
        }
    }

    addReminder = (reminder) => {

        this.setState({
            openAddReminderDialog: false
        })

        if (reminder) {
            this.initReminders();
        }
    }

    editReminder = (reminder) => {
        const { onEditReminder } = this.props;

        this.setState({
            openEditReminderDialog: false
        })

        if (reminder) {
            onEditReminder(reminder);
        }
    }

    handleClickEditReminder = (reminder) => {
        this.setState({
            openEditReminderDialog: true,
            selectedReminder: reminder
        })
    }

    closeShowMore = () => {
        this.setState({
            openShowMoreDialog: false
        })
    }

    handleClickShowMore = () => {
        this.setState({
            openShowMoreDialog: true
        })
    }

    handleClickAddReminder = () => {

        const { day, month, year } = this.props;
        let now = new Date(year, month, day);
        const date = moment(now).format('YYYY-MM-DD');

        this.setState({
            openAddReminderDialog: true,
            selectedReminder: {
                date
            }
        })
    }

    render() {

        const { withinTheViewMonth, day, weekday, month, year, maxReminders } = this.props;
        const { reminders, openAddReminderDialog, openEditReminderDialog, openShowMoreDialog, selectedReminder } = this.state;

        let hasMore = reminders.length > maxReminders;

        let limitedReminders = maxReminders > 0
            ? reminders.slice(0, maxReminders)
            : reminders;

        const isWeekend = weekday == 0 || weekday == 6;

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
                        reminders={limitedReminders}
                        onSelectReminder={this.handleClickEditReminder}
                    />
                </CardContent>

                {
                    hasMore && (<CardActions className="date-label-container">
                        <Button size="small" variant="text"
                            aria-label='See more ...'
                            onClick={this.handleClickShowMore}>See more ...</Button>
                    </CardActions>)
                }

                {openShowMoreDialog && (<ShowMore
                    open={openShowMoreDialog}
                    reminders={reminders}
                    day={day}
                    month={month}
                    year={year}
                    onSelectReminder={this.handleClickEditReminder}
                    onClose={this.closeShowMore} />)}

                {openEditReminderDialog && (<EditReminder
                    open={openEditReminderDialog}
                    reminder={selectedReminder}
                    onDelete={this.deleteReminder}
                    onClose={this.editReminder} />)}

                {openAddReminderDialog && (<AddReminder
                    open={openAddReminderDialog}
                    reminder={selectedReminder}
                    onClose={this.addReminder} />)}

            </Card>


        );

    }

}