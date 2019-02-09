// Core
import React, { Component, createRef } from 'react';
import d3 from 'd3';
import cx from 'classnames';
import {
    arrayOf,
    string,
    number,
    bool
} from 'prop-types';

// Styles
import Styles from './styles.m.css';

class ProgressChart extends Component {
    static propTypes = {
        percent: number.isRequired,

        /** set animation on chart */
        animate:    bool,
        colors:     arrayOf(string),
        fontFamily: string,
        img:        string,
        isCircle:   bool,

        /** can be "small", "medium", "large" */
        size:  string,
        title: string,

        /** width of chart stroke */
        width: number,
    };

    static defaultProps = {
        animate:    false,
        colors:     ['#aaa'],
        img:        '',
        isCircle:   false,
        label:      '',
        size:       'medium',
        title:      '',
        fontFamily: 'monospace',
        width:      5,
    };

    componentDidMount () {
        this._createProgressChart();
    }

    shouldComponentUpdate () {
        this._createProgressChart();
    }

    node = createRef();

    _createProgressChart = () => {
        const {
            percent,
            size,
            colors,
        } = this.props;
        const fragments = 100 / colors.length;

        let instance = fragments;

        let color = '#fff';

        for (let i = 0; i < colors.length; i++) {
            if (percent <= instance) {
                color = colors[i];
                break;
            } else {
                instance += fragments;
            }
        }

        const node = this.node.current;
        const radius = size === 'large' ? 70 : size === 'medium' ? 45 : 30;

        this._progressChart(node, color, radius, percent);
    };

    _progressChart = (node, color, radius, percent) => {
        const { width, isCircle, animate, fontFamily } = this.props;
        const startPercent = 0;
        const endPercent = percent / 100.0;
        const twoPi = Math.PI * 2;
        const formatPercent = d3.format('.0%');
        const boxSize = radius * 2 + 10;
        const count = Math.round(Math.abs((endPercent - startPercent) / 0.01));
        const step = endPercent < startPercent ? -0.01 : 0.01;
        const parent = d3.select(node);
        const arc = d3.svg.arc();

        let numberText = '';

        d3.select(node).select('svg').remove();

        if (isCircle) {
            arc.startAngle(0)
                .innerRadius(radius)
                .outerRadius(radius - width);

            const svg = parent.append('svg')
                .attr('width', boxSize)
                .attr('height', boxSize);

            const defs = svg.append('defs');

            const filter = defs.append('filter')
                .attr('id', 'blur');

            filter.append('feGaussianBlur')
                .attr('in', 'SourceGraphic')
                .attr('stdDeviation', '1');

            const g = svg.append('g')
                .attr('transform', `translate(${boxSize / 2},${boxSize / 2})`);

            const meter = g.append('g')
                .attr('class', 'progress-meter');

            meter.append('path')
                .attr('class', 'background')
                .attr('fill', '#ccc')
                .attr('fill-opacity', 0.5)
                .attr('d', arc.endAngle(twoPi));

            const foreground = meter.append('path')
                .attr('class', 'foreground')
                .attr('fill', color)
                .attr('fill-opacity', 1)
                .attr('stroke', color)
                .attr('stroke-width', 1)
                .attr('stroke-opacity', 1);

            const front = meter.append('path')
                .attr('class', 'foreground')
                .attr('fill', color)
                .attr('fill-opacity', 1);

            numberText = meter.append('text')
                .attr('fill', '#000')
                .attr('text-anchor', 'middle')
                .style('font-family', fontFamily)
                .attr('dy', '.35em');

            if (animate) {
                this._loops({
                    startPercent,
                    step,
                    count,
                    isCircle,
                    numberText,
                    foreground,
                    front,
                    twoPi,
                    arc,
                    formatPercent,
                });
            } else {
                foreground.attr('d', arc.endAngle(twoPi * endPercent));
                front.attr('d', arc.endAngle(twoPi * endPercent));
                numberText.text(formatPercent(endPercent));
            }
        } else {
            const svg = parent.append('svg')
                .attr('height', width * 8)
                .attr('width', 300);
            const defs = svg.append('defs');
            const filter = defs.append('filter')
                .attr('id', 'blur');

            filter.append('feGaussianBlur')
                .attr('in', 'SourceGraphic')
                .attr('stdDeviation', '1');

            const meter = svg.append('g')
                .attr('class', 'progress-meter');

            numberText = meter.append('text')
                .attr('fill', '#000')
                .attr('text-anchor', 'middle')
                .attr('y', 15)
                .style('font-family', fontFamily)
                .attr('x', 20);

            meter.append('rect')
                .attr('class', 'bg-rect')
                .attr('rx', 5)
                .attr('ry', 5)
                .attr('fill', '#ccc')
                .attr('fill-opacity', 0.5)
                .attr('height', width * 1.4)
                .attr('width', '100%')
                .attr('y', 25)
                .attr('x', 0);

            const done = meter.append('rect')
                .attr('class', 'progress-rect')
                .attr('fill', color)
                .attr('height', width * 1.4)
                .attr('rx', 5)
                .attr('ry', 5)
                .attr('y', 25)
                .attr('x', 0);

            if (animate) {
                done.attr('width', 0);
                done.transition()
                    .duration(1000 * (percent / 50))
                    .attr('width', `${percent}%`);

                this._loops({
                    startPercent,
                    step,
                    count,
                    isCircle,
                    numberText,
                    foreground: null,
                    front:      null,
                    twoPi:      null,
                    arc:        null,
                    formatPercent,
                });
            } else {
                done.attr('width', `${percent}%`);
                numberText.text(formatPercent(endPercent));
            }
        }
    };

    _loops = (data) => {
        this._updateProgress(data);

        if (data.count > 0) {
            data.count--;
            data.startPercent += data.step;
            setTimeout(this._loops.bind(this, data), 10);
        }
    };

    _updateProgress = (data) => {
        const {
            isCircle,
            startPercent,
            numberText,
            foreground,
            front,
            twoPi,
            arc,
            formatPercent,
        } = data;

        if (isCircle) {
            foreground.attr('d', arc.endAngle(twoPi * startPercent));
            front.attr('d', arc.endAngle(twoPi * startPercent));
        }
        numberText.text(formatPercent(startPercent));
    };

    _getImageStyles = () => {
        const { img, size } = this.props;
        const style = {
            backgroundImage: `url(${img})`,
        };

        if (size === 'medium') {
            style.width = '80px';
            style.height = '80px';
        } else if (size === 'large') {
            style.width = '130px';
            style.height = '130px';
        } else {
            style.width = '50px';
            style.height = '50px';
        }

        return style;
    };

    render () {
        const { title, isCircle, img, fontFamily } = this.props;
        const barStyles = cx(Styles.radar, 'yk-progress-bar');
        const imageStyles = this._getImageStyles();
        const labelStyles = cx(Styles.label, 'yk-progress-bar-label', {
            [Styles.left]: !isCircle,
        });

        return (
            <div
                className = { barStyles }
                ref = { this.node }>
                {
                    isCircle && img &&
                    <div className = { Styles.wrapper }>
                        <figure
                            className = { Styles.figure }
                            style = { imageStyles }
                        />
                    </div>
                }
                { title && <p className = { labelStyles } style = { { fontFamily } }>{ title }</p> }
            </div>
        );
    }
}

export default ProgressChart;
