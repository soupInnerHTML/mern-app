import "date-fns";
import React from "react"
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";

export default function TimePicker({ changeHandler, ...props }) {
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const e = date => ({
        target: {
            name: "time",
            value: date,
        },
    })

    const handleDateChange = (date, time) => {
        setSelectedDate(date);
        changeHandler(e(time?.toLowerCase()))
    };

    return (
        <MuiPickersUtilsProvider utils={ DateFnsUtils }>
            <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time"
                value={ selectedDate }
                onChange={ handleDateChange }
                KeyboardButtonProps={ {
                    "aria-label": "change time",
                } }
            />
        </MuiPickersUtilsProvider>
    )
}
