import { v4 as uuidv4 } from 'uuid';

const key = "my-reminders";

function sortReminders(dateA, dateB) {

    if (+dateA.date.year > +dateB.date.year) {
        return 1;
    }

    if (+dateA.date.month > +dateB.date.month) {
        return 1;
    }

    if (+dateA.date.day > +dateB.date.day) {
        return 1;
    }

    if (+dateA.time.hour > +dateB.time.hour) {
        return 1;
    }

    if (+dateA.time.minute > +dateB.time.minute) {
        return 1;
    }

    return -1;

}

export function deleteReminder(reminderVm) {

    return new Promise((resolve, reject) => {
        try {

            let reminders = [];

            try {
                reminders = JSON.parse(localStorage.getItem(key));
            } catch {
                reminders = [];
            }

            if (!reminders || !reminders.length)
                reminders = [];

            reminders = reminders.filter((x) => {
                return x.id != reminderVm.id;
            })

            localStorage.setItem(this.key, JSON.stringify(reminders));

            resolve()
        } catch (e) {
            reject(e)
        }
    })

}

export function updateReminder(reminderVm) {

    if (!reminderVm || !reminderVm.reminder)
        throw Error("Unable to save reminder");

    if (reminderVm.reminder.length > 30)
        throw Error("Reminder name must have at most 30 characters");

    return new Promise((resolve, reject) => {
        try {

            let reminders = [];

            try {
                reminders = JSON.parse(localStorage.getItem(key));
            } catch {
                reminders = [];
            }

            if (!reminders || !reminders.length)
                reminders = [];

            reminders = reminders.filter((x) => {
                return x.id != reminderVm.id;
            })

            reminders.push(reminderVm);
            reminders = reminders.sort(sortReminders);
            localStorage.setItem(this.key, JSON.stringify(reminders));

            resolve(reminderVm.id)
        } catch (e) {
            reject(e)
        }
    })
}

export function addReminder(reminder) {

    return new Promise(async (resolve) => {

        if (!reminder || !reminder.reminder)
            throw Error("Unable to save reminder");

        if (reminder.reminder.length > 30)
            throw Error("Reminder name must have at most 30 characters");

        let reminders = [];

        try {
            reminders = JSON.parse(localStorage.getItem(key));
        } catch {
            reminders = [];
        }

        if (!reminders || !reminders.length)
            reminders = [];

        reminder.id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        reminders.push(reminder);
        reminders = reminders.sort(sortReminders);
        localStorage.setItem(this.key, JSON.stringify(reminders));

        resolve(reminder);

    })
}

export function getRemindersForDate(reminderDateVm) {
    return new Promise((resolve, reject) => {

        let reminders = [];

        try {
            reminders = JSON.parse(localStorage.getItem(this.key));
        } catch {
            reminders = [];
        }

        if (!reminders || !reminders.length)
            reminders = [];

        if (reminders && reminders.length > 0) {
            reminders = reminders.filter(date => {
                return +date.date.year == +reminderDateVm.year
                    && +(date.date.month - 1) == +reminderDateVm.month
                    && +date.date.day == +reminderDateVm.day;
            })
        }

        // reminders = reminders.sort(this.sortReminders);
        resolve(reminders);

    });
}
