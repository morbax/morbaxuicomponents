// Core
import React from 'react';
import { shallow } from 'enzyme';

// Components
import ListContent from './';
import ListItem from '../ListItem';

// Mocks
import { jobDetailsToProps, mockedData } from "./jobDetailsContent";
const content = jobDetailsToProps(mockedData);

const result = shallow(<ListContent content = { content } />);

describe('ListContent component:', () => {
    test('should have 1 «ul» element', () => {
        expect(result.find('ul')).toHaveLength(1);
    });

    test('should have that much «ListItem» components as much as content prop length', () => {
        expect(result.find(ListItem)).toHaveLength(content.length);
    });
});
