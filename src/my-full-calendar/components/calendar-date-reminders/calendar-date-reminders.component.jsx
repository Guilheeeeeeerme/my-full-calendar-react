import { Grid, Stack } from "@mui/material";
import { Component } from "react";
import { CalendarDateReminder } from "../calendar-date-reminder/calendar-date-reminder.component";

export class CalendarDateReminders extends Component {

    render() {
        const { showWeather, showLocation, reminders, onSelectReminder } = this.props;
        const isSimpleMode = !showWeather && !showLocation;

        return (
            <div className="CalendarDateRemindersContainer">
                <Grid container spacing={isSimpleMode ? 0 : 4}>
                    {reminders.map(reminder => (
                        <Grid item md={isSimpleMode ? 12 : 6}>
                            <CalendarDateReminder
                                className="CalendarDateRemindersValue"
                                key={reminder.id}
                                reminder={reminder}
                                showWeather={showWeather}
                                showLocation={showLocation}
                                onSelectReminder={() => { onSelectReminder(reminder) }} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    }

}