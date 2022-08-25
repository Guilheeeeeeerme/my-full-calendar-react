import { Component } from "react";
import { MyFullCalendarMonthlyCalendar } from "../my-full-calendar/components/monthly-calendar/monthly-calendar.component";

export class MyFullCalendar extends Component {

    targetDate = new Date();

    constructor() {
        super();

        this.state = {
            currentMonth: this.targetDate.getMonth(),
            currentFullYear: this.targetDate.getFullYear(),
        }

    }

    setCalendarDate() {
        this.setState({
            currentMonth: this.targetDate.getMonth(),
            currentFullYear: this.targetDate.getFullYear(),
        })
    }

    goNextMonth() {
        this.targetDate.setMonth(this.targetDate.getMonth() + 1);
        this.setCalendarDate();
    }

    goPreviousMonth() {
        this.targetDate.setMonth(this.targetDate.getMonth() - 1);
        this.setCalendarDate();
    }

    render() {

        const { currentMonth, currentFullYear } = this.state;

        return (
            <main>

                <button onClick={() => { this.goPreviousMonth() }}>Previous</button>
                <button onClick={() => { this.goNextMonth() }}>Next</button>

                <MyFullCalendarMonthlyCalendar
                    month={currentMonth}
                    year={currentFullYear}
                />

            </main >
        );

    }

}