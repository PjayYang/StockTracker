import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { CandlestickGraph } from './components/CandlestickGraph';
import { D3Graph } from './components/d3Graph';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetchdata' component={FetchData} />
                <Route path='/candlestickGraph' component={CandlestickGraph} />
                <Route path='/d3Graph' component={D3Graph} />
            </Layout>
        );
    }
}
