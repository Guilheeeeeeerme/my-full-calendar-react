import { MyFullCalendarMonthlyCalendarDateReminders } from '../monthly-calendar-date-reminders/monthly-calendar-date-reminders.component';
import './monthly-calendar-date.styles.scss';

export const MyFullCalendarMonthlyCalendarDate = ({ withinTheViewMonth, day, weekday, month, year, onSelectDate }) => {

    const isWeekend = !(weekday % 6);

    const handleSelectDate = () => {
        onSelectDate && onSelectDate({
            withinTheViewMonth, day, weekday, month, year
        });
    }

    return (
        <div onClick={handleSelectDate}
            className={`my-calendar-datebox ${isWeekend ? "weekend" : ""} ${!withinTheViewMonth ? "not-month" : ""}`}>

            <div className="date-label-container">
                <p className="date-label">{day}</p>
            </div>

            <MyFullCalendarMonthlyCalendarDateReminders />

            {/*
            <div class="reminders-container">
                <div class="reminders-container-list">
                    <p class="reminders-container-list-item" *ngFor="let reminder of reminders"
                    [ngStyle]="{'color': reminder.color }">
                    {{ reminder | reminderDescription : 'short' }}</p>
                <p class="reminders-container-list-item" *ngIf="hasMore > 0">
                {{ hasMore }} more ...</p>
                </div>
            </div >
            */}

        </div >
    );

}