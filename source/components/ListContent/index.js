// Core
import React from 'react';
import PropTypes from 'prop-types';

// Components
import ListItem from '../ListItem';

// Styles
import Styles from './styles.m.css';

// Helpers
import { getUniqueID } from '../../instruments';

const ListContent = ({ content, className }) => {
    const listItemsJSX = content.map((listItem) => {
        const key = getUniqueID();

        return (
            <ListItem
                icon = { listItem.icon }
                key = { key }
                text = { listItem.text }
                value = { listItem.value }
            />
        );
    });

    return (
        <ul className = { Styles[className] }>
            { listItemsJSX }
        </ul>
    );
};

ListContent.propTypes = {
    className: PropTypes.string,
    content: PropTypes.arrayOf(PropTypes.object),
};

ListContent.defaultProps = {
    className: '',
    content: [],
};

export default ListContent;
