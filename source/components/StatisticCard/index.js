// Core
import React from 'react';
import styled, { css } from 'styled-components';
import { string, object } from 'prop-types';

const Container = styled.div`
    width: 300px;
    min-height: 130px;
    border-radius: 3px;
    box-shadow: 0 0 2px 1px rgba(203, 203, 203, 0.5);
    background-color: ${ props => props.backgroundColor };
    font-family: ${ props => props.fontFamily };
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    margin: 0 auto;
    padding: 0;
`;

const Border = styled.div`
    width: 300px;
    height: 6px;
    position: absolute;
    top: 0;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background-color: ${ props => props.color };
`;

const TopRow = styled.div`
    margin: 15px 20px 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const Headings = styled.p`
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${ props => props.color };
    margin: 0;
`;

const MiddleRow = styled.div`
    margin: 15px 20px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 30px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    color: ${ props => props.color };
    letter-spacing: normal;
    ${props =>
        !props.text &&
        css`
            margin-bottom: 10px;
    `};
`;

const BottomRow = styled.div`
    margin: 0 20px 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${ props => props.secondColor };
    word-break: break-all;
    overflow-wrap: anywhere;
    word-wrap: break-word;
`;

const StatisticCard = (props) => {
    const {
        backgroundColor,
        color,
        fontFamily,
        headings,
        secondColor,
        svg,
        text,
        value,
    } = props;

    return (
        <Container
            backgroundColor = { backgroundColor }
            fontFamily = { fontFamily }>
            <Border color = { color } />
            <TopRow>
                { svg ? svg : null }
                <Headings color = { color }>{ headings }</Headings>
            </TopRow>
            <MiddleRow
                color = { color }
                text = { text }>
                { value }
            </MiddleRow>
            { text && <BottomRow secondColor = { secondColor }>{ text }</BottomRow> }
        </Container>
    );
};

StatisticCard.propTypes = {
    backgroundColor: string,
    color:           string,
    fontFamily:      string,
    headings:        string,
    secondColor:     string,

    /** Use only our svg component */
    svg:   object,
    text:  string,
    value: string,
};

StatisticCard.defaultProps = {
    backgroundColor: '#fff',
    color:           '#333',
    fontFamily:      'monospace',
    headings:        '',
    secondColor:     '#333',
    svg:             null,
    text:            '',
    value:           '',
};

export default StatisticCard;
