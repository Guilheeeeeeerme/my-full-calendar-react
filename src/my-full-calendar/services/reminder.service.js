import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

const key = "my-reminders";

function getAllReminders() {

    let reminders = [];

    try {
        reminders = JSON.parse(localStorage.getItem(key));
    } finally {
        if (!reminders || !reminders.length)
            reminders = [];
    }

    return reminders;

}

function postReminders(reminders) {
    localStorage.setItem(key, JSON.stringify(reminders));
}


function sortReminders(dateA, dateB) {

    if (dateA.date > dateB.date) {
        return 1;
    }

    if (dateA.time > dateB.time) {
        return 1;
    }

    return -1;

}

export function deleteReminder(reminderVm) {

    let reminders = getAllReminders();

    reminders = reminders.filter((x) => {
        return x.id != reminderVm.id;
    })

    postReminders(reminders);

}

export function updateReminder(reminder) {

    if (!reminder || !reminder.name)
        throw Error("Reminder must have a name");

    if (reminder.name.length > 30)
        throw Error("Reminder name must have at most 30 characters");

    let reminders = getAllReminders();

    reminders = reminders.filter((x) => {
        return x.id != reminder.id;
    })

    reminders.push(reminder);
    reminders = reminders.sort(sortReminders);

    postReminders(reminders);

    return of(reminder)
}

export function addReminder(reminder) {

    if (!reminder || !reminder.name)
        throw Error("Reminder must have a name");

    if (reminder.name.length > 30)
        throw Error("Reminder name must have at most 30 characters");

    let reminders = getAllReminders();

    reminder.id = uuidv4();
    reminders.push(reminder);
    reminders = reminders.sort(sortReminders);

    postReminders(reminders);

    return of(reminder);
}

export function getRemindersForDate(day, month, year) {

    let reminders = getAllReminders();

    const date = `${String(year).padStart(4, 0)}-${String(month).padStart(2, 0)}-${String(day).padStart(2, 0)}`;

    reminders = reminders.filter(reminder => {
        return reminder.date == date;
    })

    return of(reminders);
}
