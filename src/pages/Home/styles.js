import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;

    flex-direction: column;

    overflow: auto;
`
export const LogoContainer = styled.div`
    display: flex;

    width: 50%; 

    align-items: center;
    justify-content: start;

    text-indent: 1rem;
`
export const MenuContainer = styled.div`
    display: flex;

    width: 50%; 

    align-items: center;
    justify-content: end;

    margin-right: 0.7rem;
`
export const MenuIcons = styled.div`
    display: flex;

    width: 100%; 

    align-items: center;
    justify-content: center;
`
export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 100vw;
    height: 15vh;

    color: black;
    background-color:  white;

    justify-content: center;
    align-items: center;

    border-bottom: 1px solid black;

    overflow: auto;
`
export const ContentContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 78vh;

    flex-direction: row;
`
export const CardsContainer = styled.div`
    display: flex;

    width: 80%;
    height: 100%;
    background-color:  white;

    justify-content: center;
`
export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 20%;
    height: 100%;

    align-items: center;
    
    border-left: 1px solid black;

    background-color:  white;

    overflow: auto;
`
export const Card = styled.div`
    display: flex;
    align-items: center;

    width: 95%;
    height: 30%;

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
export const InfoImage = styled.img`
    width: 80%;
    height: 40%;

    margin-top: 1rem;

    border: 1px solid black;

    border-radius: 15px;

    box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);
`