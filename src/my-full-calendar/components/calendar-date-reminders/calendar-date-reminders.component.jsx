import { Component } from "react";
import { CalendarDateReminder } from "../calendar-date-reminder/calendar-date-reminder.component";

export class CalendarDateReminders extends Component {

    render() {
        const { reminders, onSelectReminder } = this.props;

        return (
            <div className="CalendarDateRemindersContainer">
                {reminders.map(reminder => (
                    <CalendarDateReminder
                        className="CalendarDateRemindersValue"
                        key={reminder.id}
                        reminder={reminder}
                        onSelectReminder={() => { onSelectReminder(reminder) }} />
                ))}
            </div>
        )
    }

}