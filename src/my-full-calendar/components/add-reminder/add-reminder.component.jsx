import { Button, DialogActions, DialogContent, DialogTitle, Grid, Stack, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Component } from 'react';
import { CirclePicker } from 'react-color';
import { addReminder } from '../../services/reminder.service';
import { ReminderWeatherInfo } from '../reminder-weather-info/reminder-weather-info.component';

export class AddReminder extends Component {

    inputProps = {
        name: { required: true, maxLength: 30 },
        date: { required: true },
        time: { required: true, step: 300 },
        location: {},
        description: {},
        color: {},
    }

    constructor() {
        super();
        this.state = {
            name: '',
            date: '',
            time: '',
            location: '',
            description: '',
            color: '',
            nameIsValid: true,
            dateIsValid: true,
            timeIsValid: true,
            locationIsValid: true,
            descriptionIsValid: true
        };
    }

    componentDidMount() {
        const { reminder } = this.props;
        if (reminder) {
            const { name, date, time, location, description, color } = reminder;

            this.setState({
                name: name ?? '',
                date: date ?? '',
                time: time ?? '',
                location: location ?? '',
                description: description ?? '',
                color: color ?? ''
            });
        }
    }

    handleSubmit = (event) => {
        const { name, date, time, location, description, color } = this.state;
        const { onClose } = this.props;

        event.preventDefault();
        addReminder({ name, date, time, location, description, color })
            .subscribe((newReminder) => {
                onClose(newReminder);
            })
    };

    handleClose = () => {
        const { onClose } = this.props;
        onClose();
    };

    handleChange = (event) => {

        let validation = {}
        if (this.inputProps[event.target.name].required) {
            validation[`${event.target.name}IsValid`] = event.target.value?.length > 0
        }

        this.setState({
            ...this.state,
            ...validation,
            [event.target.name]: event.target.value,
        });
    };

    handleColorChange = (event) => {
        this.setState({
            ...this.state,
            color: event.hex,
        });
    };

    render() {

        const { name, date, time, location, description, color, nameIsValid, dateIsValid, timeIsValid } = this.state;
        const { open } = this.props;
        const reminder = { location, date };

        const isValid = nameIsValid && dateIsValid && timeIsValid;

        return (
            <Dialog onClose={this.handleClose} open={open} fullWidth>
                <form noValidate onSubmit={this.handleSubmit}>
                    <DialogTitle>Add Reminder</DialogTitle>
                    <DialogContent>

                        <Stack spacing={1} >

                            <TextField id="reminder-input" aria-describedby="Reminder Name" margin='dense'
                                value={name} name='name' label="Reminder" error={!nameIsValid}
                                inputProps={{ ...this.inputProps.name }}
                                onChange={(e) => { this.handleChange(e) }}
                                helperText="Remind me about this." />

                            <Grid container>
                                <Grid item sm={12} md={6}>
                                    <TextField id="date-input" aria-describedby="Reminder Date" margin='dense'
                                        value={date} name='date' label="Date" type="date" error={!dateIsValid}
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ ...this.inputProps.date }}
                                        onChange={(e) => { this.handleChange(e) }} />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <TextField id="time-input" aria-describedby="Reminder Time" margin='dense'
                                        value={time} name='time' label="Time" type="time" error={!timeIsValid}
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ ...this.inputProps.time }}
                                        onChange={(e) => { this.handleChange(e) }} />
                                </Grid>
                            </Grid>

                            <TextField multiline minRows={3} id="description-input" aria-describedby="Reminder Description" margin='dense'
                                value={description} name='description' label="Description"
                                inputProps={{ ...this.inputProps.description }}
                                onChange={(e) => { this.handleChange(e) }} />

                            <TextField id="location-input" aria-describedby="Reminder Location" margin='dense'
                                value={location} name='location' label="Location"
                                inputProps={{ ...this.inputProps.location }}
                                onChange={(e) => { this.handleChange(e) }} />

                            <ReminderWeatherInfo reminder={reminder} />

                            <CirclePicker id="color-input" aria-describedby="Reminder Color" margin='dense'
                                value={color} color={color} name='color' label="Color"
                                inputProps={{ ...this.inputProps.color }}
                                onChange={(e) => { this.handleColorChange(e) }} />

                        </Stack>


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button variant='contained' disabled={!isValid} type='submit'>Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        )
    }

}