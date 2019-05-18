// Core
import React from 'react';
import styled, { css } from 'styled-components';
import { shape, bool, string, arrayOf, number } from 'prop-types';

const Container = styled.div`
    font-family: ${ props => props.fontFamily };
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: ${ props => props.gutters }px;
`;
const Block = styled.span`
    padding: 6px 12px;
    border: 1px solid ${ props => props.borderColor };
    border-radius: 4px;
    font-size: 14px;
    margin: 0 ${ props => props.gutters }px ${ props => props.gutters }px 0;
    ${props =>
        props.isColored &&
        css`
            background: ${ props => props.bgColor };
            color: ${ props => props.activeColor }
    `};
`;

const BlockContent = (props) => {
    const {
        data,
        activeColor,
        bgColor,
        borderColor,
        color,
        fontFamily,
        gutters,
    } = props;

    return (
        <Container
            fontFamily = { fontFamily }
            gutters = { gutters }>
            {
                data.map((item, index) => (
                    <Block
                        activeColor = { activeColor }
                        bgColor = { bgColor }
                        borderColor = { borderColor }
                        color = { color }
                        gutters = { gutters }
                        isColored = { item.colored }
                        key = { `block-component-${index}` }>
                        { item.value }
                    </Block>
                ))
            }
        </Container>
    );
};

BlockContent.propTypes = {
    data: arrayOf(shape({
        value:   string,
        colored: bool,
    })).isRequired,
    activeColor: string,
    bgColor:     string,
    borderColor: string,
    color:       string,
    fontFamily:  string,
    gutters:     number,
};

BlockContent.defaultProps = {
    activeColor: '#fff',
    bgColor:     '#555',
    borderColor: '#cfcfcf',
    color:       '#333',
    fontFamily:  'monospace',
    gutters:     10,
};

export default BlockContent;
