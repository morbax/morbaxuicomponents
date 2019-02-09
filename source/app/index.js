// Core
import React, { Component } from 'react';

// Components
import RadarChart from '../components/RadarChart';
import ProgressChart from '../components/ProgressChart';
import FunnelChart from '../components/FunnelChart';

import Navigation from '../components/Navigation';
import ListContent from '../components/ListContent';

// ListContent config
// import { assessmentToProps, mockedData } from './ListContent/companyAssessmentsContent';
// import { profileToProps, mockedData } from './ListContent/companyProfileContent';
// import { vacancyToProps, mockedData } from './ListContent/vacancyContent';
// import { jobDetailsToProps, mockedData } from "./ListContent/jobDetailsContent";

// const listContent = assessmentToProps(mockedData);
// const listContent = jobDetailsToProps(mockedData);

export default class App extends Component {

    render () {
        const radarData = [
            [
                { axis: 'First',  value: 3 },
                { axis: 'Second', value: 5 },
                { axis: 'Third',  value: 6 },
                { axis: 'Fourth', value: 8 },
                { axis: 'Fifth',  value: 4 },
                { axis: 'Sixth',  value: 1 },
                { axis: 'Eighth', value: 5 },
                { axis: 'Ninth',  value: 10 },
            ],
        ];
        const data = [
            { label: 'First', value: 24000, backgroundColor: '#4286f4' },
            { label: 'Second', value: 14000, backgroundColor: '#4286f4' },
            { label: 'Third', value: 10000, backgroundColor: '#4066ef' },
            { label: 'Fourth', value: 5000, backgroundColor: '#4e40ef' },
            { label: 'Fifth', value: 3500, backgroundColor: '#ba40ef' },
            { label: 'Sixth', value: 1500, backgroundColor: '#dc62fc' }
        ];

        return (
            <div >
                {/*<FunnelChart*/}
                    {/*dataset = { data }*/}
                {/*/>*/}
                {/*<RadarChart*/}
                    {/*dataset = { radarData }*/}
                    {/*colors = { ['#aaa', 'red'] }*/}
                    {/*// roundStrokes = { true }*/}
                    {/*// dotRadius = { 10 }*/}
                    {/*// labelFactor = { 1.2 }*/}
                    {/*// strokeWidth = { 2 }*/}
                    {/*// levels = { 10 }*/}
                    {/*// maxValue = { 10 }*/}
                    {/*gradient = { ['#aaa', '#eee'] }*/}
                {/*/>*/}
                {/*<ProgressChart*/}
                    {/*percent = { 100 }*/}
                    {/*colors = { ['#D0021B', '#FECB45', '#0FBFA5', '#aaa', '#000'] }*/}
                    {/*isCircle = { false }*/}
                    {/*title = 'Progress bar'*/}
                {/*/>*/}
                <ProgressChart
                    size = 'large'
                    percent = { 80 }
                    isCircle ={ true }
                    img = 'https://cdn-images-1.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png'
                    title = 'Progress bar circle'
                />
                {/*<ProgressChart*/}
                    {/*size = 'medium'*/}
                    {/*percent = { 50 }*/}
                    {/*isCircle ={ true }*/}
                    {/*img = 'https://cdn-images-1.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png'*/}
                    {/*title = 'Progress bar circle'*/}
                {/*/>*/}
                {/*<ProgressChart*/}
                    {/*size = 'large'*/}
                    {/*percent = { 30 }*/}
                    {/*isCircle ={ true }*/}
                    {/*img = 'https://cdn-images-1.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png'*/}
                    {/*title = 'Progress bar circle'*/}
                {/*/>*/}
                {/*<ProgressChart*/}
                    {/*size = 'medium'*/}
                    {/*percent = { 50 }*/}
                    {/*isCircle ={ true }*/}
                    {/*title = 'Progress bar circle'*/}
                {/*/>*/}
            </div>
        );
    }
}
