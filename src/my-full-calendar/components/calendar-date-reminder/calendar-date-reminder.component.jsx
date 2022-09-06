import { Button, Card, CardActions, CardContent, Chip, Grid, Typography } from "@mui/material";
import { Component } from "react";
import { ReminderWeatherInfo } from "../reminder-weather-info/reminder-weather-info.component";
import './calendar-date-reminder.styles.scss';

export class CalendarDateReminder extends Component {

    render() {
        const { showWeather, showLocation, onSelectReminder, reminder } = this.props;

        const isSimpleMode = !showWeather && !showLocation;

        const chipLabel = `${reminder.time} - ${reminder.name}`
        const customStyle = reminder?.color
            ? { backgroundColor: reminder?.color, mixBlendMode: 'difference' }
            : {}

        return isSimpleMode
            ? (
                <div className="CalendarDateReminderContainer" >
                    <Chip className="CalendarDateReminderValue"
                        style={customStyle}
                        onClick={onSelectReminder} clickable
                        key={reminder.id}
                        label={chipLabel}
                        variant="filled" />
                </div>
            ) : (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {reminder.name}
                        </Typography>

                        <Typography variant="h5" component="div">
                            {reminder.time}
                        </Typography>

                        {showLocation && (<Typography sx={{ mb: 1.5 }} color="text.secondary"> {reminder.location} </Typography>)}
                        {showWeather && (<ReminderWeatherInfo reminder={reminder} />)}

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