import React, { useEffect, useState } from "react"
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
import { connect } from "react-redux";
import { getCurrentTodo, getIcons, getThemes } from "../../../redux/selectors";
import { addTodosTC, editTodoTC, setCurrentTodo, setOpenModal } from "../../../redux/reducers/todosReducer";

const FormAddTodo = ({ action, addTodosTC, editTodoTC, currentTodo, icons, themes, setCurrentTodo, setOpenModal, }) => {
    const [variant, setVariant] = useState(false)
    const [submit, setSubmit] = useState(false)
    const iconsKeys = Object.keys(icons)
    const { loading, } = useHttp()

    useEffect(() => {
        console.log(loading)
    }, [loading])

    let initialState = currentTodo || {
        label: "",
        icon: iconsKeys[0],
        desc: "",
        time: format(new Date(), "p").toLowerCase(),
        theme: "primary",
    }

    const [todoData, changeHandler] = useFormChange(initialState)

    const { userId, } = useAuth()

    const submitHandler = async (e) => {
        e.preventDefault()
        setCurrentTodo(null)
        setSubmit(true)

        if (todoData.desc && todoData.label) {
            setSubmit(false)

            switch (action) {
                case "add":
                    addTodosTC({ ...todoData, owner: userId, })
                    break
                case "edit":
                    editTodoTC(currentTodo._id, { ...todoData, owner: userId, })
                    break
                case "copy":
                    const { label, icon, desc, theme, } = todoData
                    addTodosTC({
                        label, icon, desc, theme,
                        time: format(new Date(), "p").toLowerCase(),
                        owner: userId,
                    })
                    break
            }
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
                    
                    <Button onClick={ () => setOpenModal(false) }>
                        Cancel
                    </Button>
                </Grid>

            </Grid>
        </form>
    )
}

let mapStateToProps = state => ({
    currentTodo: getCurrentTodo(state),
    icons: getIcons(state),
    themes: getThemes(state),
})

let mapDispatchToProps = {
    addTodosTC, editTodoTC, setCurrentTodo, setOpenModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAddTodo)