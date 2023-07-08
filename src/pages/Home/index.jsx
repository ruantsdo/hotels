import React, { useState, useEffect } from 'react'

import Header from '../../components/Header/header'
import TargetCard from '../../components/Card/Card'

import { Container, SearchContainer, CardsContainer, InfoContainer, 
        ContentContainer,Title, SubTitle, 
        InfoImage } from './styles'

import SearchIcon from '@mui/icons-material/Search';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import Ilustration from '../../assets/imgs/searchPhoto.jpeg'

import { db } from '../../services/firebase'
import { collection, query, getDocs } from "firebase/firestore";

const Home = () => {
  const [targetData, setTargetData] = useState([])
  const [filteredTargets, setFilteredTargets] = useState([]);


  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("");

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
  };
  
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
          <TargetCard targetData={targetData} filteredTargets={filteredTargets} fetchTargetData={handleSearch} searchValue={searchValue} />
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