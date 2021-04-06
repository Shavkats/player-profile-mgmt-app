import React, {useState, useRef, useEffect} from 'react';
import * as actions from '../actions/playerActions';
import {connect} from 'react-redux';
import useForm from './useForm';
import { useToasts } from 'react-toast-notifications';
import { Grid, TextField, FormControl, Button, InputLabel, Select, MenuItem, withStyles, FormHelperText } from '@material-ui/core';

const styles = theme => ({
    root:{
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialValues = {
    fullName: '',
    age: '',
    citizenship: '',
    position: '',
    currentClub: '',
    marketValue: ''
}

const PlayerForm = ({classes, ...props}) => {

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    const {addToast} = useToasts();

    useEffect(() => {
            setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const validateForm = (fieldValues = values) => {
        let temp = {...errors};
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName !== ""? "" : "This field is required";
        if ('age' in fieldValues)
            temp.age = fieldValues.age !== ""? "" : "This field is required";
        if ('citizenship' in fieldValues)
            temp.citizenship = fieldValues.citizenship !== ""? "" : "This field is required";
        if ('position' in fieldValues)
            temp.position = fieldValues.position !== ""? "" : "This field is required";
        if ('currentClub' in fieldValues)
            temp.currentClub = fieldValues.currentClub !== ""? "" : "This field is required";
        if ('marketValue' in fieldValues)
            temp.marketValue = fieldValues.marketValue !== ""? "" : "This field is required";

        setErrors({
            ...temp
        });

        if(fieldValues === values){
            return Object.values(temp).every(x => x === "");
        }
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialValues, validateForm, props.setPlayerId);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm()){
            const onSuccess = () => {
                resetForm();
                addToast("Record submitted!", {appearance: 'success'});
            }
            if(props.playerId === 0){
                props.createPlayer(values, onSuccess);
            } else{
                props.updatePlayer(props.playerId, values, onSuccess)
            }
        }
    }

    useEffect(() => {
        if(props.playerId !== 0){
            setValues({
                ...props.playerList.find(x => x.id === props.playerId)
            })
            setErrors({});
        }
    }, [props.playerId]);

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="fullName"
                        variant="outlined"
                        label="Name"
                        value = {values.fullName}
                        onChange = {handleInputChange}
                        {...(errors.fullName && {error: true, helperText: errors.fullName})}
                    />
                        <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value = {values.age}
                        onChange = {handleInputChange}
                        {...(errors.age && {error: true, helperText: errors.age})}
                    />
                        <TextField
                        name="citizenship"
                        variant="outlined"
                        label="Country"
                        value = {values.citizenship}
                        onChange = {handleInputChange}
                        {...(errors.citizenship && {error: true, helperText: errors.citizenship})}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl 
                        variant="outlined" 
                        className={classes.formControl}
                        {...(errors.position &&  {error: true})}
                        >
                        <InputLabel ref={inputLabel}>Position</InputLabel>
                        <Select
                            name="position"
                            value={values.position}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">Select Position</MenuItem>
                            <MenuItem value="Goalkeeper">Goalkeeper</MenuItem>
                            <MenuItem value="Defender">Defender</MenuItem>
                            <MenuItem value="Midfielder">Midfielder</MenuItem>
                            <MenuItem value="Forward">Forward</MenuItem>
                        </Select>
                        {errors.position && <FormHelperText>{errors.position}</FormHelperText>}
                    </FormControl>
                    <TextField
                        name="currentClub"
                        variant="outlined"
                        label="Club"
                        value = {values.currentClub}
                        onChange = {handleInputChange}
                        {...(errors.currentClub && {error: true, helperText: errors.currentClub})}
                    />
                    <TextField
                        name="marketValue"
                        variant="outlined"
                        label="Value"
                        value = {values.marketValue}
                        onChange = {handleInputChange}
                        {...(errors.marketValue && {error: true, helperText: errors.marketValue})}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    )
}

const mapStateToProps = state =>({
        playerList: state.playerReducer.list
});

const mapActionToProps = {
    createPlayer: actions.create,
    updatePlayer: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PlayerForm));
