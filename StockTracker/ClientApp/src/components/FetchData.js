import React, { useState, useEffect, useReducer } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import Box from '@material-ui/core/Box';

const columns = [
    {
        id: 'date',
        label: 'Date'
    },
    {
        id: '1. open',
        label: 'Open'
    },
    {
        id: '2. high',
        label: 'High',
        format: value => value.toLocaleString()
    },
    {
        id: '3. low',
        label: 'Low',
        format: value => value.toLocaleString()
    },
    {
        id: '4. close',
        label: 'Close',
        format: value => value.toLocaleString()
    },
    {
        id: '5. volume',
        label: 'Volume',
        format: value => value.toLocaleString()
    }
];

const useStyles = makeStyles(theme => ({
    container: {
        maxHeight: 500
    },
    root: {
        width: '100%'
    }
}));

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 12
    },
    body: {
        fontSize: 11
    }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default
        }
    }
}))(TableRow);

export function FetchData() {
    // Custom States
    const [data, setData] = useState([]);
    const [symbol, setSymbol] = useState();
    const [stocks, setStocks] = useState([]); // Final stock in autocomplete list

    // Tables states
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onEquitiesSearch = (event, value, reason) => {
        //var filteredData = stocks.filter((e) => {
        //    return (
        //        e.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        //        e.id.toLowerCase().indexOf(value.toLowerCase()) > -1
        //    );
        //});

        fetch('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + value + '&apikey=demo')
            .then(response => response.json())
            .then(data => {
                var results = [];
                var extractedData = data['bestMatches'];
                if (extractedData) {
                    for (var i = 0; i < extractedData.length; i++) {
                        results.push({ id: extractedData[i]['1. symbol'], name: extractedData[i]['2. name'] });
                    }
                    setStocks(results);
                }
            });
    };
    const onEquitiesSelect = (event, value) => {
        if (value) {
            // TODO: Change the api key from 'demo' to actual API key
            fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + value.id + '&interval=5min&outputsize=full&apikey=DTERMHIEHFCZJZCD')
                .then(response => response.json())
                .then(data => {

                    if (data['Meta Data']) {
                        var results = [];
                        var date;
                        var id = 0;

                        // TODO: create variables for field name in data.
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
                    } else {
                        alert("There was an error searching Equity.");
                    }
                });

        } else {
            setData([]);
        }
    };

    useEffect(() => {
        function getData() {
        }
    });

    const headerTitle = data.length === 0 ? "Search Equities" : symbol;

    let contents = (
        <div>
            <div>
                <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                    <h1>{headerTitle}</h1>
                </Box>
            </div>
            <div>
                <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                    <Autocomplete
                        id="equity-autocomplete-search"
                        options={stocks}
                        getOptionLabel={option => option.id}
                        renderOption={option => <React.Fragment><span>{option.name} ({option.id})</span></React.Fragment>}
                        style={{ width: 300 }}
                        renderInput={params => <TextField {...params} label="Search Equities" variant="outlined" fullWidth />}
                        onChange={onEquitiesSelect}
                        onInputChange={onEquitiesSearch}
                    />
                </Box>
            </div>
            <div>
                <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map(column => (
                                            <StyledTableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </StyledTableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                        return (
                                            <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map(column => {
                                                    const value = row[column.id];
                                                    return (
                                                        <StyledTableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </StyledTableCell>
                                                    );
                                                })}
                                            </StyledTableRow>
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
                </Box>
            </div>
        </div>
    );

    return contents;
}

