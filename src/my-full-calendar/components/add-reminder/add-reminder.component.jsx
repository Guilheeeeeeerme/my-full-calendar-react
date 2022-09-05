import { Button, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, Stack, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Component } from 'react';
import { GithubPicker } from 'react-color';
import { addReminder } from '../../services/reminder.service';
import { ReminderWeatherInfo } from '../reminder-weather-info/reminder-weather-info.component';

export class AddReminder extends Component {

    inputProps = {
        name: { required: true, maxLength: 30 },
        date: { required: true },
        time: { required: true, step: 300 },
        location: {},
        color: {},
    }

    constructor() {
        super();
        this.state = {
            name: '',
            date: '',
            time: '',
            location: '',
            color: ''
        };
    }

    componentDidMount() {
        const { reminder } = this.props;
        if (reminder) {
            const { name, date, time, location, color } = reminder;

            this.setState({
                name, date, time, location, color
            });
        }
    }

    handleSubmit = (event) => {
        const { name, date, time, location, color } = this.state;
        const { onClose } = this.props;

        event.preventDefault();
        addReminder({ name, date, time, location, color })
            .subscribe((newReminder) => {
                onClose(newReminder);
            })
    };

    handleClose = () => {
        const { onClose } = this.props;
        onClose();
    };

    handleChange = (event) => {
        this.setState({
            ...this.state,
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
        const { name, date, time, location, color } = this.state;
        const { open } = this.props;
        const reminder = { location, date };

        return (
            <Dialog onClose={this.handleClose} open={open}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <DialogTitle>Add Reminder</DialogTitle>
                    <DialogContent>

                        <Stack spacing={4} >

                            <FormControl margin='dense'>
                                <TextField id="reminder-input" aria-describedby="Reminder Name"
                                    value={name} name='name' label="Reminder"
                                    inputProps={{ ...this.inputProps.name }}
                                    onChange={(e) => { this.handleChange(e) }} />
                                <FormHelperText id="reminder-helper-text">Remind me about this.</FormHelperText>
                            </FormControl>

                            <Grid>

                                <TextField id="date-input" aria-describedby="Reminder Date" margin='dense'
                                    value={date} name='date' type="date" label="Date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{ ...this.inputProps.date }}
                                    onChange={(e) => { this.handleChange(e) }} />

                                <TextField id="time-input" aria-describedby="Reminder Time" margin='dense'
                                    value={time} name='time' type="time" label="Time"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{ ...this.inputProps.time }}
                                    onChange={(e) => { this.handleChange(e) }} />

                            </Grid>

                            <TextField id="location-input" aria-describedby="Reminder Location" margin='dense'
                                value={location} name='location' label="Location"
                                inputProps={{ ...this.inputProps.location }}
                                onChange={(e) => { this.handleChange(e) }} />

                            <ReminderWeatherInfo reminder={reminder} />

                            <GithubPicker id="color-input" aria-describedby="Reminder Color" margin='dense'
                                value={color} name='color' label="Color"
                                inputProps={{ ...this.inputProps.color }}
                                onChange={(e) => { this.handleColorChange(e) }} />


                        </Stack>


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button variant='contained' type='submit'>Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        )
    }

}