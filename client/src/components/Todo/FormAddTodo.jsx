import React, { useContext, useEffect, useState } from "react"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import TimePicker from "./TimePicker";
import Error from "../Common/Error";
import getId from "lodash/uniqueId"
import { Button, FormControlLabel, FormHelperText, MenuItem, Select, Switch } from "@material-ui/core";
import { IconsContext } from "../../context/IconsContext"
import { useFormChange } from "../../hooks/useFormChange";
import { format } from "date-fns"
// import { useValidNull } from "../../hooks/useValidNull";
import { AuthContext } from "../../context/AuthContext"
import { TodosContext } from "../../context/TodoContext";
import { useHttp } from "../../hooks/useHttp";
import { toCapitalize } from "../../utils/utils";

export default function FormAddTodo({ handleClose, action, }) {
    const icons = useContext(IconsContext).todos
    const auth = useContext(AuthContext)
    const [variant, setVariant] = useState(false)
    const iconsKeys = Object.keys(icons)
    const { request, error, closeError, } = useHttp()
    const { todos, setTodos, } = useContext(TodosContext)

    const addTodo = (data) => {
        setTodos([...todos, { _id: getId(), ...data, }])
    }

    const editTodo = (body, id) => {
        setTodos(todos.map(todo => todo._id === id ? body : todo))
    }

    const [todoData, changeHandler] = useFormChange({
        label: "",
        icon: iconsKeys[0],
        desc: "",
        time: format(new Date(), "p").toLowerCase(),
        theme: "primary",
    })

    // console.log(todoData.variant)

    const themes = ["primary", "secondary", "disabled", "default"]

    let errorCustom = [false, ""]

    const submitHandler = async (e) => {
        e.preventDefault()
        // eslint-disable-next-line react-hooks/rules-of-hooks
        // error = useValidNull(todoData.label)
        
        const { userId, token, } = auth
        
        if (!errorCustom[0]) {
            if (true) {
                try {
                    if (action === "add") {
                        let response = await request("/api/todo/", "POST", { ...todoData, owner: userId, }, {
                            Authorization: `Bearer ${token}`,
                        } )
                        addTodo(todoData)
                    }
                    if (action === "edit") {
                        let response = await request("/api/todo/" + todos[4]._id, "PUT", { ...todoData, owner: userId, }, {
                            Authorization: `Bearer ${token}`,
                        } )
                        editTodo(todoData, todos[4]._id)
                    }
                    handleClose()

                    // console.log(response)
                }
                catch (e) {
                }
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

        // else {
        //     setVariant(false)
        // }
        
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
                        // required
                        // placeholder={}
                        error={  errorCustom[0] }
                        helperText={ errorCustom[1] }
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
                        { action }
                    </Button>
                    
                    <Button onClick={ handleClose }>
                        Cancel
                    </Button>
                </Grid>

                <Error { ...{ error, closeError, } }/>
            </Grid>
        </form>
    )
}
