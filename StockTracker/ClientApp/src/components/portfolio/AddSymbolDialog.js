import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

export default function FormDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>Add Symbol</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth='true'>
                <DialogTitle id="form-dialog-title">Add a new Symbol</DialogTitle>
                <DialogContent>
                    <form className={classes.root} noValidate autoComplete="off">
                        <DialogContentText></DialogContentText>
                        <div>
                            <TextField autoFocus required id="Symbol" label="Symbol" variant="outlined" fullWidth />
                        </div>
                        <div>
                            <TextField required id="shares" label="# of Shares" type="number" variant="outlined" fullWidth />
                        </div>
                        <div>
                            <TextField required id="avgCost" label="Avg. Cost" type="number" variant="outlined" fullWidth />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleClose} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}