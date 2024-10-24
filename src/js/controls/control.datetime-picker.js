import { getLocalTimeZone } from "../utils/time";

export class NamelistDateTimePicker {

    static _format = "YYYY-MM-DD_HH:mm:ss";
    static _utc = "UTC";

    constructor(inputGroup, options) {

        // default settings
        this._options = {
            onChange: null,
            valueUtc: null,
            displayTimeZone: null
        };

        if (options) {
            this._options = Object.assign(this._options, options);
        }

        // set default timezone
        if (!this._options.displayTimeZone) {
            this._options.displayTimeZone = getLocalTimeZone();
        }

        this._input = inputGroup.querySelector('input');
        
        if (!this._input) {
            throw new Error("Error initializing date-time picker - INPUT element not found.");
        }

        this._widget = inputGroup;
        this._init(inputGroup);        
    }

    _init(element) {

        this._dateTimePicker = $(element).datetimepicker({
            allowInputToggle: true,
            showClose: true,
            showClear: true,
            showTodayButton: true,
            format: NamelistDateTimePicker._format,
            timeZone: this.displayTimeZone,
            useCurrent: true,
            icons: {
                date: 'far fa-calendar-alt',
                time: 'far fa-clock',
                clear: 'far fa-trash-alt',
                close: 'fas fa-times',
                today: 'far fa-calendar-check'
            }
        });

        const self = this;
        this._dateTimePicker.on("dp.change", (e) => {
            if (typeof(self._options.onChange) === 'function') {
                self._options.onChange.call(this, {
                    sender: self,
                    valueUtc: self.valueUtc
                });
            }
        });

        if (this._options.valueUtc !== null) {
            this.valueUtc = this._options.valueUtc;
        }
    }

    show() {
        this._dateTimePickerObject.show();
    }

    get input() {
        return this._input;
    }

    get widget() {
        return this._widget;
    }

    get _dateTimePickerObject() {
        return this._dateTimePicker.data("DateTimePicker");
    }

    get _momentValueUtc() {
        return moment.tz(this._input.value, NamelistDateTimePicker._format, this.displayTimeZone).tz(NamelistDateTimePicker._utc);
    }

    formatUtc() {
        return this._momentValueUtc.format(NamelistDateTimePicker._format);
    }

    get valueUtc() {
        return this._momentToNsDate(this._momentValueUtc);
    }

    set valueUtc(value) {
        
        let momentValue = null;

        if (typeof(value) === 'string') {
            momentValue = moment.tz(value, NamelistDateTimePicker._format, NamelistDateTimePicker._utc)
        }
        else {
            momentValue = moment.tz([value.year, value.month - 1, value.day, value.hour, value.minute, value.second], NamelistDateTimePicker._utc);
        }

        this._input.value = momentValue.tz(this.displayTimeZone).format(NamelistDateTimePicker._format);
    }

    get displayTimeZone() {
        return this._options.displayTimeZone;
    }

    set displayTimeZone(tz) {
        const utc = this.valueUtc;
        this._options.displayTimeZone = tz;
        this._dateTimePickerObject.timeZone(tz);
        this.valueUtc = utc;
    }

    _momentToNsDate(value) {
        const values = value.toArray();
        return {
            year: values[0],
            month: values[1] + 1,
            day: values[2], 
            hour: values[3],
            minute: values[4],
            second: values[5]
        }
    }
}

