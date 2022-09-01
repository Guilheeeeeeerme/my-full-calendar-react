
export const MyFullCalendarMonthlyCalendarDateReminders = ({ reminders }) => {

    return (
        <div className="MyFullCalendarMonthlyCalendarDateRemindersContainer">
            {reminders.map(reminder => (
                <p key={reminder.id} className="MyFullCalendarMonthlyCalendarDateRemindersValue">
                    {reminder.name} - {reminder.time}
                    {/* <pre>{JSON.stringify(reminder, null, 2) }</pre> */}
                </p>
            ))}
        </div>
    )


}