import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}



export function FetchData() {
    const [forecasts, setForecasts] = useState([]);
    const [loading, setloading] = useState(true);
    const classes = useStyles();
    useEffect(() => {
        function getData() {
            fetch('api/SampleData/WeatherForecasts')
                .then(response => response.json())
                .then(data => {
                    setForecasts(data);
                    setloading(false);
                });
        };

        if (forecasts.length === 0) {
            getData();
        }
    });

    let contents = loading
        ? <p><em>Loading...</em></p>
        : (<div>
            <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Temperature F</TableCell>
                            <TableCell align="right">Temperature C</TableCell>
                            <TableCell align="right">Summary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {forecasts.map(row => (
                            <TableRow key={row.name}>
                                <TableCell align="right">{row.dateFormatted}</TableCell>
                                <TableCell align="right">{row.temperatureC}</TableCell>
                                <TableCell align="right">{row.temperatureF}</TableCell>
                                <TableCell align="right">{row.summary}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>);

    return contents;
}

