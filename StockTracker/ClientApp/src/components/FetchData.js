import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    //{ id: 'symbol', label: 'Symbol', minWidth: 170 },
    {
        id: 'open', label: 'Open', minWidth: 100
    },
    {
        id: 'high',
        label: 'High',
        minWidth: 170,
        align: 'right',
        format: value => value.toLocaleString()
    },
    {
        id: 'low',
        label: 'Low',
        minWidth: 170,
        align: 'right',
        format: value => value.toLocaleString()
    },
    {
        id: 'close',
        label: 'Close',
        minWidth: 170,
        align: 'right',
        format: value => value.toLocaleString()
    },
    {
        id: 'volume',
        label: 'Volume',
        minWidth: 170,
        align: 'right',
        format: value => value.toLocaleString()
    }
];

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: 440
    }
});

const tempGetData = () => {
    var data = [];

    for (var i = 0; i < 100; i++) {
        data.push({
            symbol: "MSFT",
            open: 179.87,
            high: 179.96,
            low: 179.51,
            close: 179.94,
            volume: 1154234
        });
    }


    return data;
};


export function FetchData() {
    const [rows, setForecasts] = useState([]);
    const [symbol, setSymbol] = useState("");
    const [loading, setloading] = useState(true);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        function getData() {
            //fetch('api/SampleData/WeatherForecasts')
            //    .then(response => response.json())
            //    .then(data => {
            //        setForecasts(data);
            //        setloading(false);
            //    });
            var data = tempGetData();
            setForecasts(data);
            setloading(false);
            setSymbol(data[0]["symbol"]);
        }

        if (rows.length === 0) {
            getData();
        }
    });

    let contents = loading
        ? <p><em>Loading...</em></p>
        : (<div>
            <h1>Microsoft ({symbol})</h1>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.symbol}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map(column => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>);

    return contents;
}

