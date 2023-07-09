import styled from 'styled-components';

import background from "../../assets/imgs/background2.jpg"

export const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 97vh;

    justify-content: center;
    align-items: center;

    background-color: white;
    background-image: url(${background});

    overflow: auto;
`
export const FormContainer = styled.div`
    display: flex;

    width: 35vw;
    height: 30rem;

    background-color: white;
    border: 1px solid black;
    border-radius: 0.5rem;

    box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);

    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`
export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`
export const InputContainer = styled.div`
    display: flex;
    width: 80%; 
    display: flex; 
    flex-direction: column;
`
export const Title = styled.text`
    color: black;
    font-size: large;
`
export const SubTitle = styled.text`
    color: black;
    font-size: large;
`

