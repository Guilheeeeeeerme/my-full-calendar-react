import { Button, Card, CardActions, CardContent, Chip, Grid, Typography } from "@mui/material";
import { Component } from "react";
import { ReminderWeatherInfo } from "../reminder-weather-info/reminder-weather-info.component";
import './calendar-date-reminder.styles.scss';

export class CalendarDateReminder extends Component {

    render() {
        const { showWeather, showLocation, onSelectReminder, reminder } = this.props;

        const isSimpleMode = !showWeather && !showLocation;

        const chipLabel = `${reminder.time} - ${reminder.name}`


        return isSimpleMode
            ? (
                <div className="CalendarDateReminderContainer" >
                    <Chip className="CalendarDateReminderValue"
                        style={reminder ? { backgroundColor: reminder.color } : {}}
                        onClick={onSelectReminder} clickable
                        key={reminder.id}
                        label={chipLabel}
                        variant="filled" />
                </div>
            ) : (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary"
                            style={reminder ? { color: reminder.color } : {}}
                            gutterBottom>
                            {reminder.name}
                        </Typography>

                        <Typography variant="h5" component="div">
                            {reminder.time}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {showLocation && reminder.location}
                            {showWeather && (<ReminderWeatherInfo reminder={reminder} />)}
                        </Typography>

                        <Typography variant="body2">
                            {reminder.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={onSelectReminder}>Edit</Button>
                    </CardActions>
                </Card>
            );
    }

}