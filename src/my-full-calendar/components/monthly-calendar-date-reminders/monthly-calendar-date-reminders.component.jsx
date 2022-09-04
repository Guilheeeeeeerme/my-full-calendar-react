
export const MyFullCalendarMonthlyCalendarDateReminders = ({ reminders, onSelectReminder }) => {

    return (
        <div className="MyFullCalendarMonthlyCalendarDateRemindersContainer">
            {reminders.map(reminder => (
                <p
                    onClick={() => { onSelectReminder(reminder) }}
                    key={reminder.id}
                    className="MyFullCalendarMonthlyCalendarDateRemindersValue">
                    {reminder.name} - {reminder.time}
                </p>
            ))}
        </div>
    )


}