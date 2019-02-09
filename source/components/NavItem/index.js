// Core
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.m.css';

const NavItem = (props) => {
    const { path, text, svg } = props;

    return (
        <NavLink
            activeClassName = { Styles.navItem_active }
            className = { Styles.navItem }
            to = { path }>
            { svg }
            <span>{ text }</span>
        </NavLink>
    );
};

NavItem.propTypes = {
    path: PropTypes.string,
    svg:  PropTypes.object,
    text: PropTypes.string,
};

NavItem.defaultProps = {
    path: '',
    svg:  {},
    text: '',
};

export default NavItem;
