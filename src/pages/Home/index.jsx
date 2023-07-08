import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../Contexts/Auth'

import Header from '../../components/Header/header'
import TargetCard from '../../components/Card/Card'

import { Container, SearchContainer, CardsContainer, InfoContainer, 
        ContentContainer,Title, SubTitle, 
        InfoImage, Card, CardInfo } from './styles'

import SearchIcon from '@mui/icons-material/Search';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import Ilustration from '../../assets/imgs/searchPhoto.jpeg'

import { db } from '../../services/firebase'
import { collection, query, getDocs } from "firebase/firestore";

const Home = () => {
  // eslint-disable-next-line
  const { token } = useContext(AuthContext)

  const [targetData, setTargetData] = useState([])
  const [filteredTargets, setFilteredTargets] = useState([]);

  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [targetIndex, setTargetIndex] = useState(null)

  const fetchTargetData = async () => {
    try {
        const q = query(collection(db, "establishments"));
        const querySnapshot = await getDocs(q);
        const targetsData = [];
        querySnapshot.forEach((doc) => {
            targetsData.push(doc.data());
        });
        setTargetData(targetsData);
    } catch (error) {
        alert("Erro ao ler dados do Firestore:", error);
    }
  }

  useEffect(() => {
    fetchTargetData()

    // eslint-disable-next-line
  }, [])

  const handleSearch = async () => {
    try {
      const filteredTargets = targetData.filter((target) =>
        target.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredTargets(filteredTargets);
    } catch (error) {
      alert("Erro ao realizar a busca com filtro:", error);
    }

    setSearchValue(inputValue)
  }

  const handleCardClick = (index) => {
    setTargetIndex(index)
  }
  
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
              endAdornment: 
              <InputAdornment position="end" >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => handleSearch()}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>,
          }}
          value={inputValue}
          onChange={(event) => {setInputValue(event.target.value)}}
        /> 
      </SearchContainer>
      <ContentContainer>
        <CardsContainer>
          {targetData.length === 0 ? 
            <Card>
              <CardInfo>
                <Title>Não há hotéis cadastrados no momento!</Title>
              </CardInfo>
            </Card>
          :
            <TargetCard targetData={targetData} filteredTargets={filteredTargets} fetchTargetData={handleSearch} searchValue={searchValue} handleCardClick={handleCardClick} />
          }
        </CardsContainer>
        <InfoContainer>
        {targetIndex !== null && searchValue === "" ? (
          <>
            <InfoImage src={Ilustration} />
            <Title>{targetData[targetIndex].name}</Title>
            <SubTitle>{targetData[targetIndex].address}</SubTitle>
            <Title>Vantagens</Title>
            <Title>Valor</Title>
          </>
        ) : targetIndex !== null && searchValue !== "" ? (
          <>
            <InfoImage src={Ilustration} />
            <Title>{filteredTargets[targetIndex].name}</Title>
            <SubTitle>{filteredTargets[targetIndex].address}</SubTitle>
            <Title>Vantagens</Title>
            <Title>Valor</Title>
          </>
        ) : (
          <Title>Clique em um card para obter mais informações!</Title>
        )}
      </InfoContainer>
      </ContentContainer>
    </Container>
  )
}

export default Home