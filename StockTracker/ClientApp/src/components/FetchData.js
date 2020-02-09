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
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const columns = [
    {
        id: 0,
        name: 'date',
        label: 'Date'
    },
    {
        id: 1,
        name: '1. open',
        label: 'Open'
    },
    {
        id: 2,
        name: '2. high',
        label: 'High',
        format: value => value.toLocaleString()
    },
    {
        id: 3,
        name: '3. low',
        label: 'Low',
        format: value => value.toLocaleString()
    },
    {
        id: 4,
        name: '4. close',
        label: 'Close',
        format: value => value.toLocaleString()
    },
    {
        id: 5,
        name: '5. volume',
        label: 'Volume',
        format: value => value.toLocaleString()
    }
];

const top100Stocks = [
    { id: "AAPL", name: "Apple Inc." },
    { id: "MSFT", name: "Microsoft Corporation" }
];

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: 440
    }
});

export function FetchData() {
    const [data, setData] = useState([]);
    const [symbol, setSymbol] = useState();
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

    const onEquitiesSearch = (event, value) => {
        if (value) {
        // TODO: Change the api key from 'demo' to actual API key
            fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + value.id + '&interval=5min&apikey=demo')
                .then(response => response.json())
                .then(data => {

                    if (data['Meta Data']) {
                        var results = [];
                        var date;
                        var id = 0;
                        for (date in data['Time Series (5min)']) {
                            var record = {};
                            var d;

                            for (d in data['Time Series (5min)'][date]) {
                                record['date'] = date;
                                record['id'] = id;
                                record[d] = data['Time Series (5min)'][date][d];
                            }
                            id++;
                            results.push(record);
                        }

                        setSymbol(data['Meta Data']['2. Symbol']);
                        setData(results);
                        setloading(false);
                    } else {
                        alert("There was an error on searching Equity.");
                    }
                });
        } else {
            setData([]);
        }
    };

    useEffect(() => {
        function getData() {
            //fetch('api/SampleData/WeatherForecasts')
            //    .then(response => response.json())
            //    .then(data => {
            //        setForecasts(data);
            //        setloading(false);
            //    });
            //var data = tempGetData();
            //setForecasts(data);
            //setSymbol(data[0]["symbol"]);
        }

        //if (data.length === 0) {
        //    getData();
        //}
    });

    const headerTitle = data.length === 0 ? "Search Equities" : symbol;

    let contents = (
        <div>
            <h1>{headerTitle}</h1>
            <div><Autocomplete
                id="combo-box-demo"
                options={top100Stocks}
                getOptionLabel={option => option.id}
                renderOption={option => <React.Fragment><span>{option.name} ({option.id})</span></React.Fragment>}
                style={{ width: 300 }}
                renderInput={params => <TextField {...params} label="Search Equities" variant="outlined" fullWidth />}
                onChange={onEquitiesSearch}
            /></div>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map(column => {
                                            const value = row[column.name];
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
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );

    return contents;
}

