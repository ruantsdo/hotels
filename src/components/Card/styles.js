import React from 'react';
import styled from 'styled-components';

export const CardsContainer = styled.div`
    display: flex;

    width: 80%;
    height: 100%;
    background-color:  white;

    justify-content: center;
`
export const Card = styled.div`
    display: flex;
    align-items: center;

    width: 95%;
    height: 10rem;

    background-color: white;
    border: 1px solid black;

    margin-top: 1rem;

    border-radius: 5px;

    box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);

`
export const CardImage = styled.img`
    width: 25%;
    height: 90%;

    margin-left: 1rem;

    border-radius: 15px;

    box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);
`
export const CardInfo = styled.div`
    display: flex;
    flex-direction: column;

    width: 50%;
    height: 95%;

    margin-left: 1rem;
    margin-right: 1rem;

    justify-content: space-around;

    text-indent: 1rem;
`
export const CardInfo2 = styled.div`
    display: flex;
    flex-direction: column;

    width: 30%;
    height: 90%;

    margin-right: 1rem;

    border: 1px black solid;
    border-radius: 15px;

    justify-content: space-around;
    align-items: center;

    box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);
`
export const Title = styled.text`
    color: black;
`
export const SubTitle = styled.text`
    color: black;
`