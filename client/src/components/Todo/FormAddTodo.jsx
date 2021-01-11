import React, { useContext, useState } from "react"
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import TimePicker from "./TimePicker";
import getId from "lodash/uniqueId"
import { Button, FormControlLabel, FormHelperText, MenuItem, Select, Switch } from "@material-ui/core";
import { IconsContext } from "../../context/IconsContext"
import { useFormChange } from "../../hooks/useFormChange";

export default function FormAddTodo({ handleClose, addTodo, }) {
    const icons = useContext(IconsContext).todos
    const iconsKeys = Object.keys(icons)
    const [variant, setVariant] = useState(false)
    const [todoData, changeHandler] = useFormChange({ label: "", icon: iconsKeys[0], desc: "", time: "", theme: "primary", })
    console.log(todoData)

    const themes = ["primary", "secondary", "disabled", "default"]

    const submitHandler = () => {
        addTodo(todoData)
        handleClose()
    }

    const changeSwitchHandler = (e) => {
        setVariant(!variant)
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
                        required
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
                    <Select fullWidth value={ todoData.theme } name="theme" onChange={ changeHandler }>
                        {
                            themes.map(icon => <MenuItem key={ getId() } value={ icon }>{ icon }</MenuItem>)
                        }
                    </Select>

                    <FormHelperText>Theme</FormHelperText>
                </Grid>

                <Grid item xs={ 12 }>
                    <TextField
                        required
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
                        control={ <Switch checked={ variant } onChange={ changeSwitchHandler } value={ variant ? undefined : "outlined"  } color="primary" name="variant" /> }
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
