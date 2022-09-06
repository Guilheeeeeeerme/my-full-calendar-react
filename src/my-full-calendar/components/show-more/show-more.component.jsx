import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Stack } from "@mui/system";
import moment from "moment";
import { Component } from "react";
import { CalendarDateReminders } from "../calendar-date-reminders/calendar-date-reminders.component";

export class ShowMore extends Component {

    constructor() {
        super();

        this.state = {
            dateLabel: ''
        }
    }

    componentDidMount() {
        const { day, month, year } = this.props;
        const dateLabel = moment(new Date(year, month, day)).format('LL');

        this.setState({
            dateLabel: dateLabel,
        })
    }

    render() {

        const { dateLabel } = this.state;
        const { open, reminders, onSelectReminder, onClose } = this.props;

        return (
            <Dialog onClose={onClose} open={open} fullWidth>

                <DialogTitle>{dateLabel}</DialogTitle>
                <DialogContent>
                    <CalendarDateReminders
                        showWeather={true}
                        showLocation={true}
                        reminders={reminders}
                        onSelectReminder={onSelectReminder}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    }
}