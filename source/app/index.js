// Core
import React, { Component } from 'react';

// Components
import StatisticCard from '../components/StatisticCard';

export default class App extends Component {
    render () {
        return (
            <div >
                <StatisticCard
                    backgroundColor = { '#fff' }
                    color = { '#333' }
                    headings = { '+20' }
                    secondColor = { '#333' }
                    text = { 'Published vacancies\n' }
                    value = { '1250' }
                />
            </div>
        );
    }
}
