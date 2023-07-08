import styled from 'styled-components';

export const Container = styled.header`
  display: flex;

  width: 100vw;
  height: 7vh;
  background-color: #845EC2;

  overflow: hidden;
`
export const LogoContainer = styled.div`
    display: flex;

    width: 50%; 

    align-items: center;
    justify-content: start;

    text-indent: 1rem;

    &:hover{
        cursor: pointer;
    }
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
export const Logo = styled.img`
    width: 40px;
    height: 40px;

    margin-left: 0.5rem;
`

