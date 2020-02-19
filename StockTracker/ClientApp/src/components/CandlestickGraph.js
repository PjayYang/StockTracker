import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    const [stocks, setStocks] = useState([]);

    const onEquitiesSearch = (event, value, reason) => {

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
                        BuildGraph(results);

                    } else {
                        alert("There was an error searching Equity.");
                    }
                });

        } else {
            setData([]);
        }
    };


    const headerTitle = data.length === 0 ? "Search Equities" : symbol;

    const content = (
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
            <div id="container" className={classes.container} >
            </div>
        </div>
    );

    return content;
}