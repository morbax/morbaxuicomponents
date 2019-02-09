// Core
import React, { Component, createRef } from 'react';
import D3Funnel from 'd3-funnel';
import {
    arrayOf,
    bool,
    string,
    shape,
    number
} from 'prop-types';

// Styles
import Styles from './styles.m.css';

class FunnelChart extends Component {
    static propTypes = {
        dataset: arrayOf(shape({
            label:           string,
            value:           number,
            backgroundColor: string,
        })).isRequired,

        /** Time of animation funnel */
        animate:     number,
        bottomWidth: number,
        curve:       bool,
        fontFamily:  string,
        width:       number,
    };

    static defaultProps = {
        fontFamily:  'monospace',
        width:       420,
        animate:     100,
        bottomWidth: 2 / 4,
        curve:       false,
    };

    componentDidMount () {
        this._createFunnelChart();
    }

    shouldComponentUpdate () {
        this._createFunnelChart();
    }

    node = createRef();

    _createFunnelChart = () => {
        const {
            dataset,
            fontFamily,
            width,
            animate,
            bottomWidth,
            curve,
        } = this.props;
        const node = this.node.current;
        const options = {
            block: {
                highlight: true,
                fill:      {
                    type: 'gradient',
                },
            },
            label: {
                fontFamily,
            },
            chart: {
                bottomPinch: 1,
                width,
                animate,
                bottomWidth,
                curve:       {
                    enabled: curve,
                },
            },
        };

        new D3Funnel(node).draw(dataset, options);
    };

    render () {
        return (
            <div className = { Styles.funnel } ref = { this.node } />
        );
    }
}

export default FunnelChart;
