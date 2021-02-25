const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

export function monthConverter(monthInt) {
    return months[monthInt - 1];
}

export function convertDate(dateStr) {
    var date = new Date(dateStr);

    var day = date.getUTCDate();
    var month = monthConverter(date.getMonth());
    var year = date.getFullYear();

    return `${day} ${month} ${year}`;
}