import { Component } from "react";
import { getRemindersForDate } from "../../services/reminder.service";

export class MyFullCalendarMonthlyCalendarDateReminders extends Component {

    constructor() {
        super();

        this.state = {
            reminders: []
        }
    }

    componentDidMount() {
        const { day, month, year } = this.props;
        getRemindersForDate(day, month + 1, year)
            .subscribe((reminders) => {

                this.setState({
                    reminders: reminders
                })
            })

    }

    render() {

        return (
            <div className="MyFullCalendarMonthlyCalendarDateRemindersContainer">
                {this.state.reminders.map(reminder => (
                    <p key={reminder.id} className="MyFullCalendarMonthlyCalendarDateRemindersValue">
                        {reminder.name} - {reminder.time}
                        {/* <pre>{JSON.stringify(reminder, null, 2) }</pre> */}
                    </p>
                ))}
            </div>
        )

    }
}