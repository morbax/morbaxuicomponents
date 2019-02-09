// Core
import React, { Component, createRef } from 'react';
import d3 from 'd3';
import cx from 'classnames';
import {
    bool,
    arrayOf,
    string,
    shape,
    number
} from 'prop-types';

// Styles
import Styles from './styles.m.css';

// Instruments
d3.selection.prototype.first = function () {
    return d3.select(this[0][0]);
};
d3.selection.prototype.last = function () {
    const last = this.size() - 1;

    return d3.select(this[0][last]);
};

class RadarChart extends Component {
    static propTypes = {
        colors:  arrayOf(string).isRequired,
        dataset: arrayOf(arrayOf(shape({
            axis:  string,
            value: number,
        }))).isRequired,
        dotRadius:    number,
        gradient:     arrayOf(string),
        labelFactor:  number,
        levels:       number,
        maxValue:     number,
        roundStrokes: bool,
        strokeWidth:  number,
    };

    static defaultProps = {
        roundStrokes: true,
        strokeWidth:  2,
        dotRadius:    4,
        levels:       10,
        maxValue:     10,
        labelFactor:  1.2,
    };

    state = {
        margin: {
            top:    70,
            right:  100,
            bottom: 70,
            left:   100,
        },
    };

    componentDidMount () {
        this._createRadarChart();
    }

    shouldComponentUpdate () {
        this._createRadarChart();
    }

    node = createRef();

    _createRadarChart = () => {
        const {
            dataset,
            roundStrokes,
            colors,
            dotRadius,
            levels,
            maxValue,
            labelFactor,
            strokeWidth,
            gradient,
        } = this.props;
        const color = d3.scale.ordinal().range(colors);
        const minusForScale = window.innerWidth < 768 ? 0 : 80;
        const node = this.node.current;
        const { margin } = this.state;
        const width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right - minusForScale;
        const height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20) - minusForScale;
        const options = {
            w:              width,
            h:              height,
            wrapWidth:      10,
            opacityArea:    0.75,
            opacityCircles: 0.1,
            margin,
            color,
            levels,
            maxValue,
            labelFactor,
            dotRadius,
            strokeWidth,
            roundStrokes,
            gradient,
        };

        if (colors.length < dataset.length) {
            throw Error('Set count of colors equal to count of dataset');
        }

        this._radarChart(node, dataset, options);
    };

    _radarChart = (node, data, options) => {
        const maxValue = Math.max(
            options.maxValue,
            d3.max(
                data,
                (i) => d3.max(
                    i.map((o) => o.value)
                )
            )
        );
        const allAxis = data[0].map((i, j) => i.axis);
        const total = allAxis.length;
        const radius = Math.min(options.w / 2, options.h / 2);
        const format = d3.format('');
        const angleSlice = Math.PI * 2 / total;
        const rScale = d3.scale.linear()
            .range([0, radius])
            .domain([0, maxValue]);

        d3.select(node).select('svg').remove();

        const svg = d3.select(node).append('svg')
            .attr('width', options.w + options.margin.left + options.margin.right)
            .attr('height', options.h + options.margin.top + options.margin.bottom)
            .attr('class', 'radar');

        const g = svg.append('g')
            .attr('transform',
                `translate(${options.w / 2 + options.margin.left},${options.h / 2 + options.margin.top})`
            );
        const defs = svg.append('defs');

        if (options.gradient) {
            const gradient = defs.append('linearGradient')
                .attr('id', 'svgGradient')
                .attr('x1', '0%')
                .attr('x2', '100%')
                .attr('y1', '0%')
                .attr('y2', '100%');

            gradient.append('stop')
                .attr('class', 'start')
                .attr('offset', '0%')
                .attr('stop-color', options.gradient[0])
                .attr('stop-opacity', 1);
            gradient.append('stop')
                .attr('class', 'end')
                .attr('offset', '100%')
                .attr('stop-color', options.gradient[1])
                .attr('stop-opacity', 1);
        }

        const filter = g.append('defs').append('filter').attr('id', 'glow');

        filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur');

        const feMerge = filter.append('feMerge');

        feMerge.append('feMergeNode').attr('in', 'coloredBlur');
        feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

        const axisGrid = g.append('g').attr('class', 'axisWrapper');

        const axis = axisGrid.selectAll('.axis')
            .data(allAxis)
            .enter()
            .append('g')
            .attr('class', 'axis');

        axis.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', (chartData, index) => rScale(maxValue) * Math.cos(angleSlice * index - Math.PI / 2))
            .attr('y2', (chartData, index) => rScale(maxValue) * Math.sin(angleSlice * index - Math.PI / 2))
            .attr('class', 'line')
            .style('stroke', '#cdcdcd')
            .style('stroke-width', '1px');

        axisGrid.selectAll('.levels')
            .data(d3.range(1, options.levels + (options.gradient ? 1 : 2)).reverse())
            .enter()
            .append('circle')
            .attr('class', 'gridCircle')
            .attr('r', (chartData) => radius / options.levels * chartData)
            .style('fill', '#e2e2e2')
            .style('stroke', '#cdcdcd')
            .style('fill-opacity', options.opacityCircles)
            .style('filter', 'url(#glow)');

        const circleCharts = axisGrid.selectAll('circle');

        circleCharts.first()
            .style('fill', '#fff')
            .style('stroke', 'url(#svgGradient)')
            .style('stroke-width', '3px');

        axisGrid.selectAll('.axisLabel')
            .data(d3.range(1, options.levels + (options.gradient ? 1 : 2)).reverse())
            .enter().append('text')
            .attr('class', 'axisLabel')
            .attr('x', 4)
            .attr('y', (chartData) => -chartData * radius / options.levels)
            .attr('dy', '0.4em')
            .style('font-size', '10px')
            .attr('fill', '#5d5d5d')
            .style('font-family', 'Open Sans')
            .style('font-weight', 'bold')
            .text((chartData) => format(maxValue * chartData / options.levels));
        axisGrid.selectAll('text.axisLabel').first().text('');

        axis.append('text')
            .attr('class', 'legend')
            .style('font-size', '12px')
            .style('font-family', 'Open Sans')
            .style('fill', '#5d5d5d')
            .style('letter-spacing', '0.4px')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.2em')
            .style('font-weight', '600')
            .attr('x', (chartData, index) =>
                rScale(maxValue * options.labelFactor) * Math.cos(angleSlice * index - Math.PI / 2))
            .attr('y', (chartData, index) =>
                rScale(maxValue * options.labelFactor) * Math.sin(angleSlice * index - Math.PI / 2) - 15)
            .text((chartData) => chartData)
            .call(this._wrap, options.wrapWidth);

        const radarLine = d3.svg.line.radial()
            .interpolate('linear-closed')
            .radius((chartData) => rScale(chartData.value))
            .angle((chartData, index) => index * angleSlice);

        if (options.roundStrokes) {
            radarLine.interpolate('cardinal-closed');
        }

        const blobWrapper = g.selectAll('.radarWrapper')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'radarWrapper');

        blobWrapper
            .append('path')
            .attr('class', 'radarArea')
            .attr('d', (chartData) => radarLine(chartData))
            .style('fill', (chartData, index) => options.color(index))
            .style('fill-opacity', options.opacityArea)
            .on('mouseover', function () {
                d3.selectAll('.radarArea')
                    .transition()
                    .duration(200)
                    .style('fill-opacity', 0.1);
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style('fill-opacity', 0.9);
            })
            .on('mouseout', () => {
                d3.selectAll('.radarArea')
                    .transition()
                    .duration(200)
                    .style('fill-opacity', options.opacityArea);
            });
        blobWrapper.append('path')
            .attr('class', 'radarStroke')
            .attr('d', (chartData) => radarLine(chartData))
            .style('stroke-width', `${options.strokeWidth}px`)
            .style('stroke', (chartData, index) => options.color(index))
            .style('fill', 'none')
            .style('filter', 'url(#glow)');
        blobWrapper.selectAll('.radarCircle')
            .data((chartData) => chartData)
            .enter()
            .append('circle')
            .attr('class', 'radarCircle')
            .attr('r', options.dotRadius)
            .attr('cx', (chartData, index) =>
                rScale(chartData.value) * Math.cos(angleSlice * index - Math.PI / 2))
            .attr('cy', (chartData, index) =>
                rScale(chartData.value) * Math.sin(angleSlice * index - Math.PI / 2))
            .style('fill', (chartData, outerIndex, innerIndex) => options.color(innerIndex))
            .style('fill-opacity', 0.8);

        const blobCircleWrapper = g.selectAll('.radarCircleWrapper')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'radarCircleWrapper');
        const tooltip = g.append('text')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        blobCircleWrapper.selectAll('.radarInvisibleCircle')
            .data((chartData) => chartData)
            .enter()
            .append('circle')
            .attr('class', 'radarInvisibleCircle')
            .attr('r', options.dotRadius * 1.5)
            .attr('cx', (chartData, index) =>
                rScale(chartData.value) * Math.cos(angleSlice * index - Math.PI / 2))
            .attr('cy', (chartData, index) =>
                rScale(chartData.value) * Math.sin(angleSlice * index - Math.PI / 2))
            .style('fill', 'none')
            .style('pointer-events', 'all')
            .on('mouseover', function (chartData) {
                const newX = parseFloat(d3.select(this).attr('cx')) - 10;
                const newY = parseFloat(d3.select(this).attr('cy')) - 10;

                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(format(chartData.value))
                    .transition()
                    .duration(200)
                    .style('opacity', 1)
                    .style('fill', '#000');
            })
            .on('mouseout', () => {
                tooltip
                    .transition()
                    .duration(200)
                    .style('opacity', 0);
            });
    };

    _wrap = (text, width) => {
        text.each(function () {
            const d3text = d3.select(this);
            const words = d3text.text().split(/\s+/).reverse();
            const lineHeight = 1.4;
            const y = d3text.attr('y');
            const x = d3text.attr('x');
            const dy = parseFloat(d3text.attr('dy'));

            let word = [];
            let line = [];
            let lineNumber = 0;
            let tspan = d3text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em');

            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(' '));

                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(' '));
                    line = [word];
                    tspan = d3text.append('tspan').attr('x', x).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
                }
            }
        });
    };

    render () {
        const barStyles = cx(Styles.radar, 'yk-radar-bar');

        return (
            <div
                className = { barStyles }
                ref = { this.node }
            />
        );
    }

}

export default RadarChart;
