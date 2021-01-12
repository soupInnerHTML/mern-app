import React, { useContext, useState } from "react"
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import TimePicker from "./TimePicker";
import getId from "lodash/uniqueId"
import { Button, FormControlLabel, FormHelperText, MenuItem, Select, Switch } from "@material-ui/core";
import { IconsContext } from "../../context/IconsContext"
import { useFormChange } from "../../hooks/useFormChange";
import { format } from "date-fns"
import { useValidNull } from "../../hooks/useValidNull";

export default function FormAddTodo({ handleClose, addTodo, }) {
    const icons = useContext(IconsContext).todos
    const iconsKeys = Object.keys(icons)
    const [variant, setVariant] = useState(false)

    const [todoData, changeHandler] = useFormChange({ 
        label: "", 
        icon: iconsKeys[0], 
        desc: "", 
        time: format(new Date(), "p").toLowerCase(), 
        theme: "primary", 
    })
    console.log(todoData.variant)

    const themes = ["primary", "secondary", "disabled", "default"]

    let error = [false, ""]

    // let valid = 

    const submitHandler = (e) => {
        e.preventDefault()
        // eslint-disable-next-line react-hooks/rules-of-hooks
        error = useValidNull(todoData.label)
        if (!error[0]) {
            addTodo(todoData)
            handleClose()
        }
    }

    const changeSwitchHandler = (e) => {
        setVariant(!variant)
        changeHandler(e)
    }

    const selectHandler = (e) => {
        if (e.target.value === "default") {
            setVariant(true)
        }

        // else {
        //     setVariant(false)
        // }
        
        changeHandler(e)
    }


    return (
        <form onSubmit={ submitHandler }>
            <Typography variant="h6" gutterBottom>
                Adding TODO
            </Typography>

            <Grid container spacing={ 3 }>
                <Grid item xs={ 12 } sm={ 6 } style={ { marginTop: 15, } }>
                    <TextField
                        // required
                        error={  error[0] }
                        helperText={ error[1] }
                        id="label"
                        name="label"
                        label="Label"
                        fullWidth
                        onChange={ changeHandler }
                    />
                </Grid>

                <Grid item xs={ 12 } sm={ 6 }>
                    <TimePicker { ...{ changeHandler, } }></TimePicker>
                </Grid>
               
                <Grid item xs={ 12 } sm={ 6 }>
                    <Select fullWidth value={ todoData.icon } name="icon" onChange={ changeHandler }>
                        {
                            iconsKeys.map(icon => <MenuItem key={ getId() } value={ icon }>{ icon }</MenuItem>)
                        }
                    </Select>

                    <FormHelperText>Icon for todo</FormHelperText>
                </Grid>

                <Grid item xs={ 12 } sm={ 6 }>
                    <Select fullWidth value={ todoData.theme } name="theme" onChange={ selectHandler }>
                        {
                            themes.map(icon => <MenuItem key={ getId() } value={ icon }>{ icon }</MenuItem>)
                        }
                    </Select>

                    <FormHelperText>Theme</FormHelperText>
                </Grid>

                <Grid item xs={ 12 }>
                    <TextField
                        // required
                        id="desc"
                        name="desc"
                        label="Description"
                        fullWidth
                        multiline
                        onChange={ changeHandler }
                    />
                </Grid>

                <Grid item xs={ 12 } sm={ 6 }>
                    <FormControlLabel
                        control={ <Switch disabled={ todoData.theme === "default" } checked={ variant } onChange={ changeSwitchHandler } value={ variant && "" } color="primary" name="variant" /> }
                        label={ variant ? "Outlined" : "Default" }
                    />
                </Grid>

                <Grid item xs={ 12 } sm={ 6 }>
                    <Button type="submit" color="secondary">
                        Add
                    </Button>
                    
                    <Button onClick={ handleClose }>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
