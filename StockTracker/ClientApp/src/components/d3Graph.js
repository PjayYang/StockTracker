﻿import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import *  as d3 from 'd3';
import Moment from 'moment';

const useStyles = makeStyles(theme => ({
    svg: {
        width: 500,
        height: 200
    }
}));

const testData = [{ "date": "2017-11-17T06:00:00.000Z", "high": 171.389999, "low": 169.639999, "open": 171.039993, "close": 170.149994 },
{ "date": "2017-11-20T06:00:00.000Z", "high": 170.559998, "low": 169.559998, "open": 170.289993, "close": 169.979996 },
{ "date": "2017-11-21T06:00:00.000Z", "high": 173.699997, "low": 170.779999, "open": 170.779999, "close": 173.139999 },
{ "date": "2017-11-22T06:00:00.000Z", "high": 175, "low": 173.050003, "open": 173.360001, "close": 174.960007 },
{ "date": "2017-11-24T06:00:00.000Z", "high": 175.5, "low": 174.649994, "open": 175.100006, "close": 174.970001 },
{ "date": "2017-11-27T06:00:00.000Z", "high": 175.080002, "low": 173.339996, "open": 175.050003, "close": 174.089996 },
{ "date": "2017-11-28T06:00:00.000Z", "high": 174.869995, "low": 171.860001, "open": 174.300003, "close": 173.070007 },
{ "date": "2017-11-29T06:00:00.000Z", "high": 172.919998, "low": 167.160004, "open": 172.630005, "close": 169.479996 },
{ "date": "2017-11-30T06:00:00.000Z", "high": 172.139999, "low": 168.440002, "open": 170.429993, "close": 171.850006 },
{ "date": "2017-12-01T06:00:00.000Z", "high": 171.669998, "low": 168.5, "open": 169.949997, "close": 171.050003 },
{ "date": "2017-12-04T06:00:00.000Z", "high": 172.619995, "low": 169.630005, "open": 172.479996, "close": 169.800003 },
{ "date": "2017-12-05T06:00:00.000Z", "high": 171.520004, "low": 168.399994, "open": 169.059998, "close": 169.639999 },
{ "date": "2017-12-06T06:00:00.000Z", "high": 170.199997, "low": 166.460007, "open": 167.5, "close": 169.009995 },
{ "date": "2017-12-07T06:00:00.000Z", "high": 170.440002, "low": 168.910004, "open": 169.029999, "close": 169.320007 },
{ "date": "2017-12-08T06:00:00.000Z", "high": 171, "low": 168.820007, "open": 170.490005, "close": 169.369995 },
{ "date": "2017-12-11T06:00:00.000Z", "high": 172.889999, "low": 168.789993, "open": 169.199997, "close": 172.669998 },
{ "date": "2017-12-12T06:00:00.000Z", "high": 172.389999, "low": 171.460007, "open": 172.149994, "close": 171.699997 },
{ "date": "2017-12-13T06:00:00.000Z", "high": 173.539993, "low": 172, "open": 172.5, "close": 172.270004 },
{ "date": "2017-12-14T06:00:00.000Z", "high": 173.130005, "low": 171.649994, "open": 172.399994, "close": 172.220001 },
{ "date": "2017-12-15T06:00:00.000Z", "high": 174.169998, "low": 172.460007, "open": 173.630005, "close": 173.970001 },
{ "date": "2017-12-18T06:00:00.000Z", "high": 177.199997, "low": 174.860001, "open": 174.880005, "close": 176.419998 },
{ "date": "2017-12-19T06:00:00.000Z", "high": 175.389999, "low": 174.089996, "open": 175.029999, "close": 174.539993 },
{ "date": "2017-12-20T06:00:00.000Z", "high": 175.419998, "low": 173.25, "open": 174.869995, "close": 174.350006 },
{ "date": "2017-12-21T06:00:00.000Z", "high": 176.020004, "low": 174.100006, "open": 174.169998, "close": 175.009995 },
{ "date": "2017-12-22T06:00:00.000Z", "high": 175.419998, "low": 174.5, "open": 174.679993, "close": 175.009995 },
    { "date": "2017-12-26T06:00:00.000Z", "high": 171.470001, "low": 169.679993, "open": 170.800003, "close": 170.570007 }, { "date": "2017-12-27T06:00:00.000Z", "high": 170.779999, "low": 169.710007, "open": 170.100006, "close": 170.600006 }, { "date": "2017-12-28T06:00:00.000Z", "high": 171.850006, "low": 170.479996, "open": 171, "close": 171.080002 }, { "date": "2017-12-29T06:00:00.000Z", "high": 170.589996, "low": 169.220001, "open": 170.520004, "close": 169.229996 }, { "date": "2018-01-02T06:00:00.000Z", "high": 172.300003, "low": 169.259995, "open": 170.160004, "close": 172.259995 }, { "date": "2018-01-03T06:00:00.000Z", "high": 174.550003, "low": 171.960007, "open": 172.529999, "close": 172.229996 }, { "date": "2018-01-04T06:00:00.000Z", "high": 173.470001, "low": 172.080002, "open": 172.539993, "close": 173.029999 }, { "date": "2018-01-05T06:00:00.000Z", "high": 175.369995, "low": 173.050003, "open": 173.440002, "close": 175 }, { "date": "2018-01-08T06:00:00.000Z", "high": 175.610001, "low": 173.929993, "open": 174.350006, "close": 174.350006 }, { "date": "2018-01-09T06:00:00.000Z", "high": 175.059998, "low": 173.410004, "open": 174.550003, "close": 174.330002 }, { "date": "2018-01-10T06:00:00.000Z", "high": 174.300003, "low": 173, "open": 173.160004, "close": 174.289993 }, { "date": "2018-01-11T06:00:00.000Z", "high": 175.490005, "low": 174.490005, "open": 174.589996, "close": 175.279999 }, { "date": "2018-01-12T06:00:00.000Z", "high": 177.360001, "low": 175.649994, "open": 176.179993, "close": 177.089996 }, { "date": "2018-01-16T06:00:00.000Z", "high": 179.389999, "low": 176.139999, "open": 177.899994, "close": 176.190002 }, { "date": "2018-01-17T06:00:00.000Z", "high": 179.25, "low": 175.070007, "open": 176.149994, "close": 179.100006 }, { "date": "2018-01-18T06:00:00.000Z", "high": 180.100006, "low": 178.25, "open": 179.369995, "close": 179.259995 }, { "date": "2018-01-19T06:00:00.000Z", "high": 179.580002, "low": 177.410004, "open": 178.610001, "close": 178.460007 }, { "date": "2018-01-22T06:00:00.000Z", "high": 177.779999, "low": 176.600006, "open": 177.300003, "close": 177 }, { "date": "2018-01-23T06:00:00.000Z", "high": 179.440002, "low": 176.820007, "open": 177.300003, "close": 177.039993 }, { "date": "2018-01-24T06:00:00.000Z", "high": 177.300003, "low": 173.199997, "open": 177.25, "close": 174.220001 }, { "date": "2018-01-25T06:00:00.000Z", "high": 174.949997, "low": 170.529999, "open": 174.509995, "close": 171.110001 }, { "date": "2018-01-26T06:00:00.000Z", "high": 172, "low": 170.059998, "open": 172, "close": 171.509995 }, { "date": "2018-01-29T06:00:00.000Z", "high": 170.160004, "low": 167.070007, "open": 170.160004, "close": 167.960007 }, { "date": "2018-01-30T06:00:00.000Z", "high": 167.369995, "low": 164.699997, "open": 165.529999, "close": 166.970001 }, { "date": "2018-01-31T06:00:00.000Z", "high": 168.440002, "low": 166.5, "open": 166.869995, "close": 167.429993 }, { "date": "2018-02-01T06:00:00.000Z", "high": 168.619995, "low": 166.759995, "open": 167.169998, "close": 167.779999 }, { "date": "2018-02-02T06:00:00.000Z", "high": 166.800003, "low": 160.100006, "open": 166, "close": 160.5 }, { "date": "2018-02-05T06:00:00.000Z", "high": 163.880005, "low": 156, "open": 159.100006, "close": 156.490005 }, { "date": "2018-02-06T06:00:00.000Z", "high": 163.720001, "low": 154, "open": 154.830002, "close": 163.029999 }, { "date": "2018-02-07T06:00:00.000Z", "high": 163.399994, "low": 159.070007, "open": 163.089996, "close": 159.539993 }, { "date": "2018-02-08T06:00:00.000Z", "high": 161, "low": 155.029999, "open": 160.289993, "close": 155.149994 }, { "date": "2018-02-09T06:00:00.000Z", "high": 157.889999, "low": 150.240005, "open": 157.070007, "close": 156.410004 }, { "date": "2018-02-12T06:00:00.000Z", "high": 163.889999, "low": 157.509995, "open": 158.5, "close": 162.710007 }, { "date": "2018-02-13T06:00:00.000Z", "high": 164.75, "low": 161.649994, "open": 161.949997, "close": 164.339996 }, { "date": "2018-02-14T06:00:00.000Z", "high": 167.539993, "low": 162.880005, "open": 163.039993, "close": 167.369995 }, { "date": "2018-02-15T06:00:00.000Z", "high": 173.089996, "low": 169, "open": 169.789993, "close": 172.990005 }, { "date": "2018-02-16T06:00:00.000Z", "high": 174.820007, "low": 171.770004, "open": 172.360001, "close": 172.429993 }, { "date": "2018-02-20T06:00:00.000Z", "high": 174.259995, "low": 171.419998, "open": 172.050003, "close": 171.850006 }, { "date": "2018-02-21T06:00:00.000Z", "high": 174.119995, "low": 171.009995, "open": 172.830002, "close": 171.070007 }, { "date": "2018-02-22T06:00:00.000Z", "high": 173.949997, "low": 171.710007, "open": 171.800003, "close": 172.5 }, { "date": "2018-02-23T06:00:00.000Z", "high": 175.649994, "low": 173.539993, "open": 173.669998, "close": 175.5 }, { "date": "2018-02-26T06:00:00.000Z", "high": 179.389999, "low": 176.210007, "open": 176.350006, "close": 178.970001 }, { "date": "2018-02-27T06:00:00.000Z", "high": 180.479996, "low": 178.160004, "open": 179.100006, "close": 178.389999 }, { "date": "2018-02-28T06:00:00.000Z", "high": 180.619995, "low": 178.050003, "open": 179.259995, "close": 178.119995 }, { "date": "2018-03-01T06:00:00.000Z", "high": 179.779999, "low": 172.660004, "open": 178.539993, "close": 175 }, { "date": "2018-03-02T06:00:00.000Z", "high": 176.300003, "low": 172.449997, "open": 172.800003, "close": 176.210007 }, { "date": "2018-03-05T06:00:00.000Z", "high": 177.740005, "low": 174.520004, "open": 175.210007, "close": 176.820007 }, { "date": "2018-03-06T06:00:00.000Z", "high": 178.25, "low": 176.130005, "open": 177.910004, "close": 176.669998 }, { "date": "2018-03-07T06:00:00.000Z", "high": 175.850006, "low": 174.270004, "open": 174.940002, "close": 175.029999 }, { "date": "2018-03-08T06:00:00.000Z", "high": 177.119995, "low": 175.070007, "open": 175.479996, "close": 176.940002 }, { "date": "2018-03-09T06:00:00.000Z", "high": 180, "low": 177.389999, "open": 177.960007, "close": 179.979996 }, { "date": "2018-03-12T05:00:00.000Z", "high": 182.389999, "low": 180.210007, "open": 180.289993, "close": 181.720001 }, { "date": "2018-03-13T05:00:00.000Z", "high": 183.5, "low": 179.240005, "open": 182.589996, "close": 179.970001 }, { "date": "2018-03-14T05:00:00.000Z", "high": 180.520004, "low": 177.809998, "open": 180.320007, "close": 178.440002 }, { "date": "2018-03-15T05:00:00.000Z", "high": 180.240005, "low": 178.070007, "open": 178.5, "close": 178.649994 }, { "date": "2018-03-16T05:00:00.000Z", "high": 179.119995, "low": 177.619995, "open": 178.649994, "close": 178.020004 }, { "date": "2018-03-19T05:00:00.000Z", "high": 177.470001, "low": 173.660004, "open": 177.320007, "close": 175.300003 }, { "date": "2018-03-20T05:00:00.000Z", "high": 176.800003, "low": 174.940002, "open": 175.240005, "close": 175.240005 }, { "date": "2018-03-21T05:00:00.000Z", "high": 175.089996, "low": 171.259995, "open": 175.039993, "close": 171.270004 }, { "date": "2018-03-22T05:00:00.000Z", "high": 172.679993, "low": 168.600006, "open": 170, "close": 168.850006 }, { "date": "2018-03-23T05:00:00.000Z", "high": 169.919998, "low": 164.940002, "open": 168.389999, "close": 164.940002 }, { "date": "2018-03-26T05:00:00.000Z", "high": 173.100006, "low": 166.440002, "open": 168.070007, "close": 172.770004 }, { "date": "2018-03-27T05:00:00.000Z", "high": 175.149994, "low": 166.919998, "open": 173.679993, "close": 168.339996 }, { "date": "2018-03-28T05:00:00.000Z", "high": 170.020004, "low": 165.190002, "open": 167.25, "close": 166.479996 }, { "date": "2018-03-29T05:00:00.000Z", "high": 171.75, "low": 166.899994, "open": 167.809998, "close": 167.779999 }, { "date": "2018-04-02T05:00:00.000Z", "high": 168.940002, "low": 164.470001, "open": 166.639999, "close": 166.679993 }, { "date": "2018-04-03T05:00:00.000Z", "high": 168.75, "low": 164.880005, "open": 167.639999, "close": 168.389999 }, { "date": "2018-04-04T05:00:00.000Z", "high": 172.009995, "low": 164.770004, "open": 164.880005, "close": 171.610001 }, { "date": "2018-04-05T05:00:00.000Z", "high": 174.229996, "low": 172.080002, "open": 172.580002, "close": 172.800003 }, { "date": "2018-04-06T05:00:00.000Z", "high": 172.479996, "low": 168.199997, "open": 170.970001, "close": 168.380005 }, { "date": "2018-04-09T05:00:00.000Z", "high": 173.089996, "low": 169.850006, "open": 169.880005, "close": 170.050003 }, { "date": "2018-04-10T05:00:00.000Z", "high": 174, "low": 171.529999, "open": 173, "close": 173.25 }, { "date": "2018-04-11T05:00:00.000Z", "high": 173.919998, "low": 171.699997, "open": 172.229996, "close": 172.440002 }, { "date": "2018-04-12T05:00:00.000Z", "high": 175, "low": 173.039993, "open": 173.410004, "close": 174.139999 }, { "date": "2018-04-13T05:00:00.000Z", "high": 175.839996, "low": 173.850006, "open": 174.779999, "close": 174.729996 }, { "date": "2018-04-16T05:00:00.000Z", "high": 176.190002, "low": 174.830002, "open": 175.029999, "close": 175.820007 }, { "date": "2018-04-17T05:00:00.000Z", "high": 178.940002, "low": 176.410004, "open": 176.490005, "close": 178.240005 }, { "date": "2018-04-18T05:00:00.000Z", "high": 178.820007, "low": 176.880005, "open": 177.809998, "close": 177.839996 }, { "date": "2018-04-19T05:00:00.000Z", "high": 175.389999, "low": 172.660004, "open": 173.759995, "close": 172.800003 }, { "date": "2018-04-20T05:00:00.000Z", "high": 171.220001, "low": 165.429993, "open": 170.600006, "close": 165.720001 }, { "date": "2018-04-23T05:00:00.000Z", "high": 166.919998, "low": 164.089996, "open": 166.830002, "close": 165.240005 }, { "date": "2018-04-24T05:00:00.000Z", "high": 166.330002, "low": 161.220001, "open": 165.669998, "close": 162.940002 }, { "date": "2018-04-25T05:00:00.000Z", "high": 165.419998, "low": 162.410004, "open": 162.619995, "close": 163.649994 }, { "date": "2018-04-26T05:00:00.000Z", "high": 165.729996, "low": 163.369995, "open": 164.119995, "close": 164.220001 }, { "date": "2018-04-27T05:00:00.000Z", "high": 164.330002, "low": 160.630005, "open": 164, "close": 162.320007 }, { "date": "2018-04-30T05:00:00.000Z", "high": 167.259995, "low": 161.839996, "open": 162.130005, "close": 165.259995 }, { "date": "2018-05-01T05:00:00.000Z", "high": 169.199997, "low": 165.270004, "open": 166.410004, "close": 169.100006 }, { "date": "2018-05-02T05:00:00.000Z", "high": 177.75, "low": 173.800003, "open": 175.229996, "close": 176.570007 }, { "date": "2018-05-03T05:00:00.000Z", "high": 177.5, "low": 174.440002, "open": 175.880005, "close": 176.889999 }, { "date": "2018-05-04T05:00:00.000Z", "high": 184.25, "low": 178.169998, "open": 178.25, "close": 183.830002 }, { "date": "2018-05-07T05:00:00.000Z", "high": 187.669998, "low": 184.75, "open": 185.179993, "close": 185.160004 }, { "date": "2018-05-08T05:00:00.000Z", "high": 186.220001, "low": 183.669998, "open": 184.990005, "close": 186.050003 }, { "date": "2018-05-09T05:00:00.000Z", "high": 187.399994, "low": 185.220001, "open": 186.550003, "close": 187.360001 }, { "date": "2018-05-10T05:00:00.000Z", "high": 190.369995, "low": 187.649994, "open": 187.740005, "close": 190.039993 },
    { "date": "2018-05-11T06:00:00.000Z", "high": 190.059998, "low": 187.449997, "open": 189.490005, "close": 188.589996 }];

export function D3Graph() {
    const classes = useStyles();
    useEffect(() => {
        const convertedData = [];
        const svg = d3.select("svg");
        const width = 1400, height = 600;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };

        svg.attr("width", width).attr("height", height);

        for (var i = 0; i < testData.length; i++) {
            var tempDate = new Date(testData[i]['date']);

            var shortDate = new Date(Moment(tempDate).format("L"));
            convertedData.push({
                date: shortDate,
                high: testData[i]['high'],
                low: testData[i]['low'],
                open: testData[i]['open'],
                close: testData[i]['close']
            });
        }

        const firstDate = convertedData[0].date;
        const extraDay = new Date(convertedData[convertedData.length - 1].date);
        extraDay.setDate(extraDay.getDate() + 1);

        const x =
            d3.scaleBand()
                .domain(d3.timeDay
                    .range(firstDate, extraDay)
                    .filter(d => d.getDay() !== 0 && d.getDay() !== 6))
                .range([margin.left, width - margin.right])
                .padding(0.2);

        const y =
            d3.scaleLog()
                .domain([d3.min(convertedData, d => d.low), d3.max(convertedData, d => d.high)])
                .rangeRound([height - margin.bottom, margin.top]);

        const yAxis = (g) => {
            g.attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y)
                    .tickFormat(d3.format("$~f"))
                    .tickValues(d3.scaleLinear().domain(y.domain()).ticks()))
                .call(g => g.selectAll(".tick line").clone()
                    .attr("stroke-opacity", 0.2)
                    .attr("x2", width - margin.left - margin.right))
                .call(g => g.select(".domain").remove());
        };

        const xAxis = g => {
            g.attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x)
                    .tickValues(d3.timeMonday
                        .every(width > 720 ? 1 : 2)
                        .range(firstDate, extraDay))
                    .tickFormat(d3.timeFormat("%-m/%-d")))
                .call(g => g.select(".domain").remove());
        };

        const formatDate = (e) => {
            const format = d3.timeFormat("%B %-d, %Y");
            return format(e);
        };
        const formatValue = (t) => {
            const format = d3.format(".2f");
            return format(t);
        };
        const formatChange = (y0, y1) => {
            const f = d3.format("+.2%");
            const change = (y1 - y0) / y0;
            const formattedChange = f(change);
            return formattedChange;
        };

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);


        const g = svg.append("g")
            .attr("stroke-linecap", "round")
            .attr("stroke", "black")
            .selectAll("g")
            .data(convertedData)
            .join("g")
            .attr("transform", d => `translate(${x(d.date)},0)`);

        g.append("line")
            .attr("y1", d => y(d.low))
            .attr("y2", d => y(d.high));

        g.append("line")
            .attr("y1", d => y(d.open))
            .attr("y2", d => y(d.close))
            .attr("stroke", d => d.open > d.close ? d3.schemeSet1[0]
                : d.close > d.open ? d3.schemeSet1[2]
                    : d3.schemeSet1[8])
            .attr("stroke-width", x.bandwidth());

        g.append("title")
            .text(d =>
                `${formatDate(d.date)}
        Open: ${formatValue(d.open)}
        Close: ${formatValue(d.close)} (${formatChange(d.open, d.close)})
        Low: ${formatValue(d.low)}
        High: ${formatValue(d.high)}`);

    });


    return <svg />;
}

