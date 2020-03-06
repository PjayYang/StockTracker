import *  as d3 from 'd3';
import Moment from 'moment';

const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const width = 1400, height = 600;

export function BuildD3Graph(data, timeFrame) {

    timeFrame = "Test";

    switch (timeFrame) {
        case "Time Series (5min)":
            D3GraphIn5MinIntervals(data);
            break;
        default:
            Test(data);
            break;
    }

}

const Test = (data) => {
    const convertedData = [];
    const svg = d3.select("#d3Graph");

    svg.attr("width", width).attr("height", height);

    //for (var i = 0; i < data.length; i++) {
    //    var tempDate = new Date(data[i]['date']);

    //    var shortDate = new Date(Moment(tempDate).format());
    //    convertedData.push({
    //        date: shortDate,
    //        high: data[i]['2. high'],
    //        low: data[i]['3. low'],
    //        open: data[i]['1. open'],
    //        close: data[i]['4. close']
    //        // volume: data[i]['4. volume']
    //    });
    //}

    //// Sorts array by date ascending.
    //convertedData.sort(function (a, b) {
    //    return a['date'] - b['date'];
    //});

    //const firstDate = convertedData[0].date;
    //const extraDay = new Date(convertedData[convertedData.length - 1].date);
    //extraDay.setDate(extraDay.getDate() + 1);

    //var values = [100, 200, 300];
    //visualizeTicks(d3.scaleTime().domain([Date.now(), Date.now() + 24 * 60 * 60 * 1000]));
    //var x = d3.scaleTime().domain([Date.now(), Date.now() + 24 * 60 * 60 * 1000]);


};

const D3GraphIn5MinIntervals = (data) => {
    const convertedData = [];
    const svg = d3.select("#d3Graph");

    svg.attr("width", width).attr("height", height);

    for (var i = 0; i < data.length; i++) {
        var tempDate = new Date(data[i]['date']);

        var shortDate = new Date(Moment(tempDate).format());
        convertedData.push({
            date: shortDate,
            high: data[i]['2. high'],
            low: data[i]['3. low'],
            open: data[i]['1. open'],
            close: data[i]['4. close']
            // volume: data[i]['4. volume']
        });
    }

    // Sorts array by date ascending.
    convertedData.sort(function (a, b) {
        return a['date'] - b['date'];
    });

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
};

export default BuildD3Graph;
