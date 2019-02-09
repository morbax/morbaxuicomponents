// Core
import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';

// Components
import NavItem from './';

// Icon
import CompanySVG from '../../theme/assets/CompanySVG';

const result = shallow(
    <NavItem
        path = ''
        svg = { CompanySVG }
        text = ''
    />
);

describe('NavItem component:', () => {
    test('should have 1 «NavLink» component', () => {
        expect(result.find(NavLink)).toHaveLength(1);
    });

    test('should have 1 «svg» element:', () => {
        expect(result.find('svg')).toHaveLength(1);
    });

    test('should have 1 «span» element:', () => {
        expect(result.find('span')).toHaveLength(1);
    });
});
