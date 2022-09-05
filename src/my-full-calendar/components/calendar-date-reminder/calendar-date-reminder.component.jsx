import { Component } from "react";
import { ReminderWeatherInfo } from "../reminder-weather-info/reminder-weather-info.component";

export class CalendarDateReminder extends Component {

    render() {
        const { onSelectReminder, reminder } = this.props;

        return (
            <div className="CalendarDateReminderContainer"
                onClick={onSelectReminder}
                key={reminder.id}>
                {reminder.time} - {reminder.name} - <ReminderWeatherInfo reminder={reminder} />
            </div>
        )
    }

}