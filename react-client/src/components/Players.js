import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/playerActions';
import { Button, ButtonGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useToasts } from 'react-toast-notifications';
import PlayerForm from './PlayerForm';

const styles = theme => ({
        root: {
        "& .MuiTableCell-head": {
            fontSize: "1.2rem"
        }
    },
    paper: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    }
})

const Players = ({ classes, ...props }) => {

    const [playerId, setPlayerId] = useState(0);
    const {addToast} = useToasts();

    useEffect(() =>{
        props.fetchAllPlayers()
    }, []);

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deletePlayer(id,()=>addToast("Record deleted!", { appearance: 'info' }))
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item md={5}>
                    <PlayerForm {...({playerId, setPlayerId})}/>
                </Grid>
                <Grid item md={7}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell>Position</TableCell>
                                    <TableCell>Club</TableCell>
                                    <TableCell>Value</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.playerList.map((record, index) => {
                                        return(
                                            <TableRow key={index} hover>
                                                <TableCell>{record.fullName}</TableCell>
                                                <TableCell>{record.age}</TableCell>
                                                <TableCell>{record.citizenship}</TableCell>
                                                <TableCell>{record.position}</TableCell>
                                                <TableCell>{record.currentClub}</TableCell>
                                                <TableCell><span>&#8364;</span>{Number(record.marketValue).toFixed(2)}m</TableCell>
                                                <TableCell>
                                                    <ButtonGroup>
                                                        <Button><EditIcon color='primary'
                                                        onClick={() => {setPlayerId(record.id)}}/></Button>
                                                        <Button><DeleteIcon color='secondary'
                                                        onClick={() => onDelete(record.id)}/></Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }) 
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state =>({
        playerList: state.playerReducer.list
});

const mapActionToProps = {
    fetchAllPlayers: actions.fetchAll,
    deletePlayer: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Players));
