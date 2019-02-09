// Core
import React from 'react';
import { shallow } from 'enzyme';

// Components
import ListItem from './';

// Icon
import sectorIcon from '../../theme/assets/company_icons/sector.svg';

const result = shallow(<ListItem icon = { sectorIcon } />);

describe('ListItem component:', () => {
    test('should have 1 «li» element', () => {
        expect(result.find('li')).toHaveLength(1);
    });

    test('should have 1 «img» element:', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('should have 2 «span» elements:', () => {
        expect(result.find('span')).toHaveLength(2);
    });
});
