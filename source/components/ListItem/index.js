// Core
import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ icon, text, value }) => {
    return (
        <li>
            {
                icon && <img
                    alt = { text }
                    src = { icon }
                />
            }
            <span>{ text }</span>
            <span>{ value }</span>
        </li>
    );
};

ListItem.propTypes = {
    icon: PropTypes.object,
    text: PropTypes.string,
    value: PropTypes.oneOfType(
        [PropTypes.string, PropTypes.number]
    ),
};

ListItem.defaultProps = {
    icon: null,
    text: '',
    value: '',
};

export default ListItem;
