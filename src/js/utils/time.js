export function getLocalTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function listTimeZoneNames() {
    return moment.tz.names();
}