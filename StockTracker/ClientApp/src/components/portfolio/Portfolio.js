import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddSymbolDialog from './AddSymbolDialog';

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 700
    }
}));

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 16
    },
    body: {
        fontSize: 16
    }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

function createRow(symbol, shares, avgPrice) {
    var cost = 20;
    var equity = 100;
    var current = 50;

    return { symbol, shares, current, avgPrice, cost, equity };
}

const rows = [
    createRow('MSFT', 10, '$1.25'),
    createRow('SPCE', 10, '$1.25'),
    createRow('IBIO', 10, '$1.25')
];

const AddSymbol = (data) => {
    alert(data);
}

export function Portfolio() {
    const classes = useStyles();

    return (
        <Container maxWidth="xl">
        <div>
            <Grid container spacing={0} alignItems='center' justify="center">
                <Grid item xs={12} sm={1}>
                    <Typography component="div">
                        <Box fontSize={16} textAlign="center" m={3}>Initial Investment</Box>
                        <Box fontSize={16} textAlign="center" m={3}>$5,000</Box>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography component="div">
                        <Box fontSize={16} textAlign="center" m={3}>Cost Total</Box>
                        <Box fontSize={16} textAlign="center" m={3}>$3,500</Box>

                    </Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography component="div">
                        <Box fontSize={16} textAlign="center" m={3}>Difference Total</Box>
                        <Box fontSize={16} textAlign="center" m={3}>$1,500</Box>

                    </Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography component="div">
                        <Box fontSize={16} textAlign="center" m={3}>Total Equity</Box>
                        <Box fontSize={16} textAlign="center" m={3}>$4,789</Box>
                    </Typography>
                </Grid>
            </Grid>

                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={6} align="right">
                                    <AddSymbolDialog />
                                </TableCell>
                            </TableRow>
                            <StyledTableRow>
                                <StyledTableCell align="center">Symbol</StyledTableCell>
                                <StyledTableCell align="center"># of Shares</StyledTableCell>
                                <StyledTableCell align="center">Current Cost Per Share</StyledTableCell>
                                <StyledTableCell align="right">Avg. Cost</StyledTableCell>
                                <StyledTableCell align="right">Total Cost</StyledTableCell>
                                <StyledTableCell align="right">Equity</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <StyledTableRow key={row.symbol}>
                                    <StyledTableCell align="center">{row.symbol}</StyledTableCell>
                                    <StyledTableCell align="center">{row.shares}</StyledTableCell>
                                    <StyledTableCell align="center">{row.current}</StyledTableCell>
                                    <StyledTableCell align="right">{row.avgPrice}</StyledTableCell>
                                    <StyledTableCell align="right">{row.cost}</StyledTableCell>
                                    <StyledTableCell align="right">{row.avgPrice}</StyledTableCell>
                                </StyledTableRow>
                            ))}

                            <StyledTableRow>
                                <StyledTableCell colSpan={3} align="right">Total</StyledTableCell>
                                <StyledTableCell align="right">{20}</StyledTableCell>
                                <StyledTableCell align="right">{20}</StyledTableCell>
                                <StyledTableCell align="right">{20}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container>

    );
}



