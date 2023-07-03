import React from 'react'

import Header from '../../components/header'
import { Container, SearchContainer, CardsContainer, InfoContainer, 
        ContentContainer, LogoContainer, MenuContainer, Card, CardInfo, CardInfo2,
        Title, SubTitle, CardImage, InfoImage } from './styles'

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import HomeIcon from '@mui/icons-material/Home';
import HotelIcon from '@mui/icons-material/Hotel';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import LuggageIcon from '@mui/icons-material/Luggage';


import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import Ilustration from '../../assets/imgs/searchPhoto.jpeg'

import { useNavigate } from 'react-router-dom'

import { auth, db } from '../../services/firebase'
import { doc, getDoc } from "firebase/firestore"
import { signOut } from "firebase/auth";


const Home = () => {
  const navigate = useNavigate()

  const handleStoreData = async () => {
    const response = localStorage.getItem('@APPAuth:token');
    const token = JSON.parse(response);

    const docRef = doc(db, "establishments", token.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      navigate('/targetUpdate')
    } else {
      navigate('/targetRegister');
    }
  };

  function firebaseSignOut(){
    signOut(auth).then(() => {
        localStorage.clear()
        navigate('/')
    })
  }

  return (
    <Container>
      <Header>
        <LogoContainer>
          <Avatar style={{marginLeft: "1rem", marginRight: "1rem", backgroundColor: "transparent" }}>
            <LuggageIcon />
          </Avatar>
          Site de Hotel
        </LogoContainer>
        <MenuContainer>
            <IconButton style={{marginRight: "1rem", backgroundColor: "transparent", border: "2px solid black"}}
                        onClick={() => navigate('/home')}>
              <HomeIcon />
            </IconButton>
            <IconButton style={{marginRight: "1rem", backgroundColor: "transparent", border: "2px solid black"}} 
                        onClick={() =>  handleStoreData()}>
              <HotelIcon />
            </IconButton>
            <IconButton style={{marginRight: "1rem", backgroundColor: "transparent", border: "2px solid black"}}
                        onClick={() => navigate('/userUpdate')}>
              <InsertEmoticonIcon />
            </IconButton>
            <IconButton style={{marginRight: "1rem", backgroundColor: "transparent", border: "2px solid black"}}
                        onClick={() => firebaseSignOut()}>
              <ExitToAppIcon />
            </IconButton>
        </MenuContainer>
      </Header>
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