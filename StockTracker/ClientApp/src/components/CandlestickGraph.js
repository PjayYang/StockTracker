import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import *  as d3 from 'd3';
import Moment from 'moment';
import BuildD3Graph from './d3Graph';

const dev = "Dev";
const env = "Dev";

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        height: '500px',
        margin: 0,
        padding: 0
    }
}));

export function CandlestickGraph() {
    const [data, setData] = useState([]);
    const classes = useStyles(); // Tables states
    const [symbol, setSymbol] = useState(); // custom states
    const [stocks, setStocks] = useState([{ id: "Dev", name: "Dev" }]);

    const onEquitiesSearch = (event, value, reason) => {

        if (env !== dev) {
            fetch('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + value + '&apikey=DTERMHIEHFCZJZCD')
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
                }).catch(function (error) {
                    console.log('Request failed', error);
                });
        }
    };

    const onEquitiesSelect = (event, value) => {
        if (value && value.name !== dev) {
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
                        BuildD3Graph(results, 'Time Series (5min)');
                    } else {
                        alert("There was an error searching Equity.");
                    }
                });
        }
        else if (value.name === dev) {
            BuildD3Graph([], dev);
        }
        else {
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
            <div id="d3Graph" />
            <div id="container" className={classes.container} />
        </div>
    );

    return content;
}