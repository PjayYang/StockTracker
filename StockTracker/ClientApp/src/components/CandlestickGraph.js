import React, { useState, useEffect } from 'react';
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
import anychart from 'anychart';

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        height: '500px',
        margin: 0,
        padding: 0
    }
}));

const top100Stocks = [
    { id: "AAPL", name: "Apple Inc." },
    { id: "MSFT", name: "Microsoft Corporation" },
    { id: "", name: "CandleStick Graph" }
];

const BuildGraph = (data) => {
    var result = [];
    var convertedResults = [];

    // Convert date string to dates.
    for (var a = 0; a < data.length; a++) {
        const date = new Date(data[a]['date']);
        convertedResults.push([date, data[a]['1. open'], data[a]['2. high'], data[a]['3. low'], data[a]['4. close']]);
    }

    // Sorts array by date ascending.
    convertedResults.sort(function (a, b) {
        return a[0] - b[0];
    });

    for (var i = 0; i < convertedResults.length; i++) {
        // day, month, year
        const date = convertedResults[i][0].toLocaleDateString();
        var splitDate = date.split("/");
        if (splitDate[2] === "2020") {
            var month = parseInt(splitDate[0]);
            var day = parseInt(splitDate[1]);
            var year = parseInt(splitDate[2]);

            // Month displays one month ahead, so we have to subtract 1.
            result.push(
                [Date.UTC(year, month - 1, day), convertedResults[i][1], convertedResults[i][2], convertedResults[i][3], convertedResults[i][4]]
            );
        }
    }

    // create a chart
    var chart = anychart.candlestick();

    // set the interactivity mode
    chart.interactivity("by-x");

    // create a japanese candlestick series and set the data
    var series = chart.candlestick(result);
    series.pointWidth(20);

    // set the chart title
    chart.title("Japanese Candlestick Chart: Basic Sample");

    // set the titles of the axes
    chart.xAxis().title("Date");
    chart.yAxis().title("Price, $");

    // set the container id
    chart.container("container");

    // initiate drawing the chart
    chart.draw();
};

export function CandlestickGraph() {
    const [data, setData] = useState([]);
    const classes = useStyles(); // Tables states
    const [symbol, setSymbol] = useState(); // custom states

    //useEffect(() => {

    //});

    const onEquitiesSearch = (event, value) => {
        if (value) {
            // TODO: Change the api key from 'demo' to actual API key
            fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + value.id + '&apikey=demo')
                .then(response => response.json())
                .then(data => {

                    if (data['Meta Data']) {
                        var results = [];
                        var date;
                        var id = 0;
                        for (date in data['Time Series (Daily)']) {
                            var record = {};
                            var d;

                            for (d in data['Time Series (Daily)'][date]) {
                                record['date'] = date;
                                record['id'] = id;
                                record[d] = data['Time Series (Daily)'][date][d];
                            }
                            id++;
                            results.push(record);
                        }

                        setSymbol(data['Meta Data']['2. Symbol']);
                        setData(results);
                        BuildGraph(results);
                    } else {
                        alert("There was an error searching Equity.");
                    }
                });
        } else {
            setData([]);
        }
    };

    const content = (
        <div>
            <div>
                <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                    <h1>TEST</h1>
                </Box>
            </div>
            <div>
                <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
                    <Autocomplete
                        id="equity-autocomplete-search"
                        options={top100Stocks}
                        getOptionLabel={option => option.id}
                        renderOption={option => <React.Fragment><span>{option.name} ({option.id})</span></React.Fragment>}
                        style={{ width: 300 }}
                        renderInput={params => <TextField {...params} label="Search Equities" variant="outlined" fullWidth />}
                        onChange={onEquitiesSearch}
                    />
                </Box>
            </div>
            <div id="container" className={classes.container} />
        </div>
    );

    return content;
}