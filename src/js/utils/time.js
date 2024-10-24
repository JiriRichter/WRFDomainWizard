export function getLocalTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function listTimeZoneNames() {
    return moment.tz.names();
}

export function appendTimeZoneSelectOptions(selectElement, selectedTimeZone) {

    listTimeZoneNames().forEach((name) => {

        const option = document.createElement('option');
        option.value = name;
        option.innerText = name;
        if (name == selectedTimeZone) {
            option.selected = true;
        }
        selectElement.append(option);
    });
}
