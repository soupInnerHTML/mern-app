import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import cs from "classnames"

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            { "Copyright © " }
            <Link color="inherit" href="https://material-ui.com/">
                Ruby
            </Link>{ " " }
            { new Date().getFullYear() }
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatarIn: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    avatarUp: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    signUp: {
        margin: theme.spacing(3, 0, 2),
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    fade: {
        transition: "opacity .5s",
    },
}));

export default function Sign({ setIn, changeHandler, isIn, registerHandler, loginHandler, loading, }) {
    const classes = useStyles();
    const TYPE_OF = "Sign " + (isIn ? "In" : "Up")

    return (
        <>
            <CssBaseline />
            <div className={ classes.paper }>
                <Avatar className={ isIn ? classes.avatarIn : classes.avatarUp }>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    { TYPE_OF }
                </Typography>
                <form className={ classes.form } noValidate onSubmit={ isIn ? loginHandler : registerHandler }>
                    <Grid container spacing={ 2 }>
                        <Grid item xs={ 12 }>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={ changeHandler }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={ changeHandler }
                            />
                        </Grid>
                        { !isIn && <Grid item xs={ 12 }>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="repeatPassword"
                                label="Repeat password"
                                type="password"
                                id="repeatPassword"
                                onChange={ changeHandler }
                            />
                        </Grid> }
                        <Grid item xs={ 12 }>
                            <FormControlLabel
                                control={ <Checkbox value="allowExtraEmails" color="primary" /> }
                                label={ !isIn ? "I want to receive inspiration, marketing promotions and updates via email." : "Remember me" }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={ loading ? { opacity: 0.2, } : {} }
                        className={ cs(classes.fade, isIn ? classes.submit : classes.signUp) }
                    >
                        { TYPE_OF }
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2" onClick={ setIn.bind(0, !isIn) }>
                                { !isIn ? "Already have an account? Sign in" : "Don't have an account? Sign Up" }
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={ 5 }>
                <Copyright />
            </Box>
        </>
    );
}