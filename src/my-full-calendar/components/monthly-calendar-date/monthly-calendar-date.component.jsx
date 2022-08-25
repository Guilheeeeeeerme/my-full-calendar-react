import './monthly-calendar-date.styles.scss'


export const MyFullCalendarMonthlyCalendarDate = ({ withinTheViewMonth, day, weekday, month, year }) => {

    const isWeekend = !(weekday % 6);

    function selectDate() {

    }

    // "{'weekend': !(weekday % 6), 'not-month': !withinTheViewMonth }"

    return (
        <div onClick={selectDate} className={`my-calendar-datebox ${isWeekend ? "weekend" : ""} ${!withinTheViewMonth ? "not-month" : ""}`}>

            <div className="date-label-container">
                <p className="date-label">{ day }</p>
            </div>

            {/* <div class="reminders-container">
                <div class="reminders-container-list">
                    <p class="reminders-container-list-item" *ngFor="let reminder of reminders"
                    [ngStyle]="{'color': reminder.color }">
                    {{ reminder | reminderDescription : 'short' }}</p>
                <p class="reminders-container-list-item" *ngIf="hasMore > 0">
                {{ hasMore }} more ...</p>
                </div>
            </div > */}

        </div >
    );

}