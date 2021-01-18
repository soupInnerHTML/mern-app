import React, { useContext, useEffect, useState } from "react"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import TimePicker from "./TimePicker";
import getId from "lodash/uniqueId"
import { Button, FormControlLabel, FormHelperText, MenuItem, Select, Switch } from "@material-ui/core";
import { useFormChange } from "../../../hooks/useFormChange";
import { format } from "date-fns"
import { useHttp } from "../../../hooks/useHttp";
import { toCapitalize } from "../../../utils/utils";
import { useAuth } from "../../../hooks/useAuth";

export default function FormAddTodo({ handleClose, action, addTodosTC, editTodoTC, todoToEdit, setTodoToEdit, icons, themes, }) {
    const [variant, setVariant] = useState(false)
    const iconsKeys = Object.keys(icons)
    const [submit, setSubmit] = useState(false)
    const { request, loading, } = useHttp()

    let initialState = action === "edit" ? todoToEdit : {
        label: "",
        icon: iconsKeys[0],
        desc: "",
        time: format(new Date(), "p").toLowerCase(),
        theme: "primary",
    }

    const [todoData, changeHandler] = useFormChange(initialState)

    const { userId, token, } = useAuth()

    const submitHandler = async (e) => {
        e.preventDefault()
        setTodoToEdit(null)
        setSubmit(true)

        if (todoData.desc && todoData.label) {
            try {
                setSubmit(false)

                if (action === "add") {
                    let response = await addTodosTC(request, token, { ...todoData, owner: userId, })
                }
                if (action === "edit") {
                    let response = await editTodoTC(request, token, todoToEdit._id, { ...todoData, owner: userId, })
                }
                handleClose()

            }
            catch (e) {}

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
        
        changeHandler(e)
    }


    return (
        <form onSubmit={ submitHandler }>
            <Typography variant="h6" gutterBottom>
                { toCapitalize(action) }ing TODO
            </Typography>

            <Grid container spacing={ 3 }>
                <Grid item xs={ 12 } sm={ 6 } style={ { marginTop: 15, } }>
                    <TextField
                        maxlength="30"
                        value={ todoData.label }
                        error={ submit && !todoData.label }
                        helperText={ submit && !todoData.label && "Label is required" }
                        id="label"
                        name="label"
                        label="Label"
                        fullWidth
                        onChange={ changeHandler }
                    />
                </Grid>

                <Grid item xs={ 12 } sm={ 6 }>
                    <TimePicker { ...{ changeHandler, } }/>
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
                        maxlength="256"
                        value={ todoData.desc }
                        error={  submit && !todoData.desc }
                        helperText={ submit && !todoData.desc && "Description is required" }
                        id="desc"
                        name="desc"
                        label="Description"
                        fullWidth
                        multiline
                        onChange={ changeHandler }
                    />
                </Grid>

                <Grid item xs={ 12 } sm={ 6 }>
                    { /*TODO value === state.value*/ }
                    <FormControlLabel
                        control={ <Switch disabled={ todoData.theme === "default" } checked={ variant } onChange={ changeSwitchHandler } value={ variant && "" } color="primary" name="variant" /> }
                        label={ variant ? "Outlined" : "Default" }
                    />
                </Grid>

                <Grid item xs={ 12 } sm={ 6 }>
                    <Button type="submit" color="secondary" disabled={ loading }>
                        { action }
                    </Button>
                    
                    <Button onClick={ handleClose }>
                        Cancel
                    </Button>
                </Grid>

            </Grid>
        </form>
    )
}
