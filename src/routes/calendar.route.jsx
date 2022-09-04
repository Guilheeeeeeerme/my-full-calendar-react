import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Component } from "react";
import { MonthlyCalendar } from '../my-full-calendar/components/monthly-calendar/monthly-calendar.component';

export class Calendar extends Component {

    targetDate = new Date();

    constructor() {
        super();

        this.state = {
            currentMonth: this.targetDate.getMonth(),
            currentFullYear: this.targetDate.getFullYear(),
        }

    }

    setCalendarDate = () => {
        this.setState({
            currentMonth: this.targetDate.getMonth(),
            currentFullYear: this.targetDate.getFullYear(),
        })
    }

    goNextMonth = () => {
        this.targetDate.setMonth(this.targetDate.getMonth() + 1);
        this.setCalendarDate();
    }

    goPreviousMonth = () => {
        this.targetDate.setMonth(this.targetDate.getMonth() - 1);
        this.setCalendarDate();
    }

    render() {

        const { currentMonth, currentFullYear } = this.state;

        return (
            <Box>

                <Toolbar>
                    <ButtonGroup
                        variant="contained" aria-label="Month navigation buttons">
                        <Button onClick={this.goPreviousMonth} aria-label="Go to previous month navigation button">Previous</Button>
                        <Button onClick={this.goNextMonth} aria-label="Go to next month navigation button">Next</Button>
                    </ButtonGroup>

                </Toolbar>

                <main>
                    <MonthlyCalendar
                        month={currentMonth}
                        year={currentFullYear}
                    />
                </main >

            </Box>
        );

    }

}
