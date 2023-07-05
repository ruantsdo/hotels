import React from 'react'

import Header from '../../components/Header/header'
import { Container, SearchContainer, CardsContainer, InfoContainer, 
        ContentContainer, Card, CardInfo, CardInfo2, Title, SubTitle, 
        CardImage, InfoImage } from './styles'

import SearchIcon from '@mui/icons-material/Search';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import Ilustration from '../../assets/imgs/searchPhoto.jpeg'

const Home = () => {
  
  return (
    <Container>
      <Header />
      <SearchContainer>
        <div style={{ textIndent: "1rem" }}>Pesquisar</div>
        <TextField
            label="Pesquisar"
            id="search"
            sx={{ m: 1, width: '50%' }}
            InputProps={{
              endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
          }}
        />
      </SearchContainer>
      <ContentContainer>
        <CardsContainer>
          <Card>
            <CardImage src={Ilustration} />
            <CardInfo>
              <Title>Nome do hotel</Title>
              <SubTitle>Cidade</SubTitle>
            </CardInfo>
            <CardInfo2>
              <Title>Vantagens</Title>
              <Title>Valor</Title>
            </CardInfo2>
          </Card>
        </CardsContainer>
        <InfoContainer>
          <InfoImage src={Ilustration} />
            <Title>Nome do hotel</Title>
            <SubTitle>Cidade</SubTitle>
            <Title>Vantagens</Title>
            <Title>Valor</Title>
        </InfoContainer>
      </ContentContainer>
    </Container>
  )
}

export default Home