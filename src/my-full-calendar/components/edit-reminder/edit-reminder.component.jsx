import { Button, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, Stack, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Component } from 'react';
import { deleteReminder, updateReminder } from '../../services/reminder.service';
import DeleteIcon from '@mui/icons-material/Delete';
import { ReminderWeatherInfo } from '../reminder-weather-info/reminder-weather-info.component';

export class EditReminder extends Component {

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
            id: '',
            name: '',
            date: '',
            time: '',
            location: '',
            color: ''
        };
    }

    componentDidMount () {
        const { reminder } = this.props;
        const { id, name, date, time, location, color } = reminder;

        this.setState({
            id, name, date, time, location, color
        });
    }

    handleSubmit (event) {
        const { id, name, date, time, location, color } = this.state;
        const { onClose } = this.props;

        event.preventDefault();
        updateReminder({ id, name, date, time, location, color })
            .subscribe((updatedReminder) => {
                onClose(updatedReminder);
            })
    };

    handleClose () {
        const { onClose } = this.props;
        onClose();
    };

    handleChange (event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        });
    };

    handleDelete () {
        const { id, name, date, time, location, color } = this.state;
        const { onDelete } = this.props;
        deleteReminder(id)
            .subscribe(() => {
                onDelete({ id, name, date, time, location, color });
            })
    };

    render() {

        const { name, date, time, location, color } = this.state;
        const { open } = this.props;
        const reminder = { location, date };

        return (
            <Dialog onClose={this.handleClose} open={open}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <DialogTitle>Update Reminder</DialogTitle>
                    <DialogContent>

                        <Stack spacing={4} >

                            <FormControl margin='dense'>
                                <TextField id="reminder-input" aria-describedby="Reminder Name"
                                    value={name} name='name' label="Reminder"
                                    inputProps={{ ...this.inputProps.name }}
                                    onChange={(e) => { this.handleChange(e) }} />
                                <FormHelperText id="reminder-helper-text">Remind me about this.</FormHelperText>
                            </FormControl>

                            <TextField id="date-input" aria-describedby="Reminder Date" margin='dense'
                                value={date} name='date' type="date" label="Fate"
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

                            <Grid>

                                <TextField id="location-input" aria-describedby="Reminder Location" margin='dense'
                                    value={location} name='location' label="Location"
                                    inputProps={{ ...this.inputProps.location }}
                                    onChange={(e) => { this.handleChange(e) }} />

                                <TextField id="color-input" aria-describedby="Reminder Color" margin='dense'
                                    value={color} name='color' label="Color"
                                    inputProps={{ ...this.inputProps.color }}
                                    onChange={(e) => { this.handleChange(e) }} />

                            </Grid>

                        </Stack>

                        <ReminderWeatherInfo reminder={reminder} />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button color='warning' endIcon={<DeleteIcon />}
                            onClick={this.handleDelete}>Delete</Button>
                        <Button variant='contained' type='submit'>Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        )
    }

}