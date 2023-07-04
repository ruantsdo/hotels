import React, { useEffect, useState } from 'react'

import Header from "../../components/header"
import { FormContainer, Container, Title, TitleContainer, InputContainer } from "./styles"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { db } from '../../services/firebase'
import { doc, setDoc, getDoc } from "firebase/firestore"

import { useNavigate } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

const TargetUpdate = () => {
  const navigate = useNavigate()
  const { addToast } = useToasts()

  const [name, setName] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [address, setAddress] = useState("")
  const [tier, setTier] = useState("")
  const [charter, setCharter] = useState("")
  const [rooms, setRooms] = useState("")

  useEffect(() => {
    handleStoreData();
    // eslint-disable-next-line
  }, []);

  const handleStoreData = async () => {
    const response = localStorage.getItem('@APPAuth:token');
    const token = JSON.parse(response);

    const docRef = doc(db, "establishments", token.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const storeData = docSnap.data();
      setName(storeData.name);
      setCnpj(storeData.cnpj);
      setAddress(storeData.address);
      setTier(storeData.tier);
      setCharter(storeData.charter);
      setRooms(storeData.rooms);
    } else {
      addToast("Não foi possível recuperar os seus dados!", { appearance: 'error', autoDismiss: true, })
      navigate('/home');
    }
  };

  const writeStoreInDB = async () => {
    const response = localStorage.getItem('@APPAuth:token');
    const token = JSON.parse(response);

    await setDoc(doc(db, "establishments", token.uid), {
      owner: token.uid,
      name: name,
      address: address,
      tier: tier,
      cnpj: cnpj,
      charter: charter,
      rooms: rooms,
    }).catch((error) => {
      addToast("Não foi possivel atualizar os dados. Por favor tente novamente!", { appearance: 'error', autoDismiss: true, })
      addToast(error, { appearance: 'error', autoDismiss: true, })
      return
    })
      navigate('/')
    }


  return (
    <>
      <Header></Header>
      <Container>
        <FormContainer>
          <TitleContainer>
            <Title>Atualize os dados do seu Hotel</Title>
          </TitleContainer>
          <InputContainer>
            <TextField id="name" label="Nome" variant="standard" type='text' value={name} onChange={(event) => setName(event.target.value)} />
            <TextField id="cnpj" label="CNPJ" variant="standard" type='string' value={cnpj} onChange={(event) => setCnpj(event.target.value)} />
            <TextField id="adress" label="Endereço" variant="standard" type='text' value={address} onChange={(event) => setAddress(event.target.value)} />
            <TextField id="class" label="Classificação do hotel" variant="standard" type='number' value={tier} onChange={(event) => setTier(event.target.value)} />
            <TextField id="charter" label="Alvará de funcionamento" variant="standard" type='number' value={charter} onChange={(event) => setCharter(event.target.value)} />
            <TextField id="rooms" label="Quantidade de quartos" variant="standard" type='number' value={rooms} onChange={(event) => setRooms(event.target.value)} />
          </InputContainer>
          <Button variant="contained" style={{width: "70%", height: "3rem"}} onClick={() => writeStoreInDB()} >Atualizar</Button>
        </FormContainer>
      </Container>
    </>
  )
}

export default TargetUpdate