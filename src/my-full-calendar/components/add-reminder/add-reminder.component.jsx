import { Button, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, Stack, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Component, useState } from 'react';
import { addReminder } from '../../services/reminder.service';

export class MyFullCalendarAddReminder extends Component {

    constructor() {
        super();

        this.state = {
            reminder: '',
            date: '',
            time: '',
            location: '',
            color: '',
        };

        this.inputProps = {
            reminder: { required: true, maxLength: 30 },
            date: { required: true },
            time: { required: true, step: 300 },
            location: {},
            color: {},
        }
    }

    render() {
        const { reminder, date, time, location, color } = this.state;
        const { onClose, open } = this.props;

        const handleClose = () => {
            onClose();
        };

        const handleChange = (event) => {
            this.setState({
                ...this.state,
                [event.target.name]: event.target.value,
            });
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            addReminder({ reminder, date, time, location, color })
            onClose();
        };

        return (
            <Dialog onClose={handleClose} open={open}>
                <form noValidate onSubmit={handleSubmit}>
                    <DialogTitle>Add Reminder</DialogTitle>
                    <DialogContent>

                        <Stack spacing={4} >

                            <FormControl margin='dense'>
                                <TextField id="reminder-input" aria-describedby="Reminder Name"
                                    value={reminder} name='reminder' label="Reminder"
                                    inputProps={{ ...this.inputProps.reminder }}
                                    onChange={(e) => { handleChange(e) }} />
                                <FormHelperText id="reminder-helper-text">Remind me about this.</FormHelperText>
                            </FormControl>

                            <TextField id="date-input" aria-describedby="Reminder Date" margin='dense'
                                value={date} name='date' type="date" label="Fate"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{ ...this.inputProps.date }}
                                onChange={(e) => { handleChange(e) }} />

                            <TextField id="time-input" aria-describedby="Reminder Time" margin='dense'
                                value={time} name='time' type="time" label="Time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{ ...this.inputProps.time }}
                                onChange={(e) => { handleChange(e) }} />

                            <Grid>

                                <TextField id="location-input" aria-describedby="Reminder Location" margin='dense'
                                    value={location} name='location' label="Location"
                                    inputProps={{ ...this.inputProps.location }}
                                    onChange={(e) => { handleChange(e) }} />

                                <TextField id="color-input" aria-describedby="Reminder Color" margin='dense'
                                    value={color} name='color' label="Color"
                                    inputProps={{ ...this.inputProps.color }}
                                    onChange={(e) => { handleChange(e) }} />

                            </Grid>

                        </Stack>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        )
    }

}