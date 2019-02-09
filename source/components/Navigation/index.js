// Core
import React from 'react';

// Components
import NavItem from '../NavItem';

// Icons
import statistics from '../../theme/assets/StatisticsSVG';
import interviews from '../../theme/assets/InterviewsSVG';
import templates from '../../theme/assets/TemplatesSVG';
import employees from '../../theme/assets/EmployeesSVG';
import vacancy from '../../theme/assets/VacanciesSVG';
import company from '../../theme/assets/CompanySVG';
import hrBrand from '../../theme/assets/HRBrandSVG';
import hrBot from '../../theme/assets/HRBotSVG';
import logo from '../../theme/assets/LogoSVG';

// Styles
import './styles.m.css';

const Navigation = () => (
    <nav>
        <div>
            { logo }
        </div>
        <NavItem
            path = { '/vacancies' }
            svg = { vacancy }
            text = { 'Vacancies' }
        />
        <NavItem
            path = { '/interviews' }
            svg = { interviews }
            text = { 'Interviews' }
        />
        <NavItem
            path = { '/templates' }
            svg = { templates }
            text = { 'Templates' }
        />
        <NavItem
            path = { '/company' }
            svg = { company }
            text = { 'Company' }
        />
        <NavItem
            path = { '/employees' }
            svg = { employees }
            text = { 'Employees' }
        />
        <NavItem
            path = { '/statistic' }
            svg = { statistics }
            text = { 'Statistics' }
        />
        <NavItem
            path = { '/hr-brand' }
            svg = { hrBrand }
            text = { 'HR brand' }
        />
        <NavItem
            path = { '/hr-bot' }
            svg = { hrBot }
            text = { 'HR bot' }
        />
    </nav>
);

Navigation.propTypes = {};

Navigation.defaultProps = {};

export default Navigation;
