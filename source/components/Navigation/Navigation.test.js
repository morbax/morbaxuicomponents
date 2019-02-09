// Core
import React from 'react';
import { shallow } from 'enzyme';

// Components
import Navigation from './';
import NavItem from '../NavItem';

const result = shallow(<Navigation />);

describe('Navigation component:', () => {
    test('should have 1 «div» element', () => {
        expect(result.find('div')).toHaveLength(1);
    });

    test('should have 8 «NavItem» components:', () => {
        expect(result.find(NavItem)).toHaveLength(8);
    });
});
