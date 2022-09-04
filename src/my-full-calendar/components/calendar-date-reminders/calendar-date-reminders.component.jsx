import { Component } from "react";

export class CalendarDateReminders extends Component {

    render() {
        const { reminders, onSelectReminder } = this.props;

        return (
            <div className="MyFullCalendarMonthlyCalendarDateRemindersContainer">
                {reminders.map(reminder => (
                    <p
                        onClick={() => { onSelectReminder(reminder) }}
                        key={reminder.id}
                        className="MyFullCalendarMonthlyCalendarDateRemindersValue">
                        {reminder.name} - {reminder.time}
                    </p>
                ))}
            </div>
        )
    }

}