import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../Contexts/Auth'

import Header from '../../components/Header/header'
import TargetCard from '../../components/Card/Card'

import { Container, SearchContainer, CardsContainer, InfoContainer, 
        ContentContainer,Title, SubTitle, 
        InfoImage } from './styles'

import SearchIcon from '@mui/icons-material/Search';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import Ilustration from '../../assets/imgs/searchPhoto.jpeg'

import { db } from '../../services/firebase'
import { collection, query, getDocs } from "firebase/firestore";

const Home = () => {
  // eslint-disable-next-line
  const {} = useContext(AuthContext)

  const [targetData, setTargetData] = useState([])
  const [searchValue, setSearchValue] = useState("");

  const [filteredTargets, setFilteredTargets] = useState([]);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    const filteredTargets = targetData.filter((target) =>
      target.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredTargets(filteredTargets);
    setSearchValue(searchValue);
  };

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
        console.error("Erro ao ler dados do Firestore:", error);
    }
  }

  useEffect(() => {
    fetchTargetData();
  }, []);
  
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
          value={searchValue}
          onChange={handleSearchChange}
        />
      </SearchContainer>
      <ContentContainer>
        <CardsContainer>
          <TargetCard targetData={filteredTargets} fetchTargetData={fetchTargetData} />
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