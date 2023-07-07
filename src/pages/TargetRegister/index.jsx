import React, { useState, useContext } from 'react'
import AuthContext from '../../Contexts/Auth'

import Header from "../../components/Header/header"
import { FormContainer, Container, Title, TitleContainer, InputContainer } from "./styles"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { db } from '../../services/firebase'
import { doc, setDoc } from "firebase/firestore"

import { useNavigate } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

const TargetRegister = () => {
  const { token } = useContext(AuthContext)

  const navigate = useNavigate()
  const { addToast } = useToasts()

  const [name, setName] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [address, setAddress] = useState("")
  const [tier, setTier] = useState("")
  const [charter, setCharter] = useState("")
  const [rooms, setRooms] = useState("")

  async function writeStoreInDB(){
    await setDoc(doc(db, "establishments", token), {
      owner: token,
      name: name,
      address: address,
      tier: tier,
      cnpj: cnpj,
      charter: charter,
      rooms: rooms,
  }).catch((error) => {
    addToast("Não foi possivel cadastrar o hotel. Por favor tente novamente!", { appearance: 'error', autoDismiss: true, })
    return
  })
    navigate('/')
    addToast("Os dados foram cadastrados com sucesso!", { appearance: 'success', autoDismiss: true, })
  }

  return (
    <>
      <Header />
      <Container>
        <FormContainer>
          <TitleContainer>
            <Title>Cadastro de Hotel</Title>
          </TitleContainer>
          <InputContainer>
            <TextField id="name" label="Nome" variant="standard" type='text' value={name} onChange={(event) => setName(event.target.value)} />
            <TextField id="cnpj" label="CNPJ" variant="standard" type='string' value={cnpj} onChange={(event) => setCnpj(event.target.value)} />
            <TextField id="adress" label="Endereço" variant="standard" type='text' value={address} onChange={(event) => setAddress(event.target.value)} />
            <TextField id="class" label="Classificação do hotel" variant="standard" type='number' value={tier} onChange={(event) => setTier(event.target.value)} />
            <TextField id="charter" label="Alvará de funcionamento" variant="standard" type='number' value={charter} onChange={(event) => setCharter(event.target.value)} />
            <TextField id="rooms" label="Quantidade de quartos" variant="standard" type='number' value={rooms} onChange={(event) => setRooms(event.target.value)} />
          </InputContainer>
          <Button variant="contained" style={{width: "70%", height: "3rem"}} onClick={() => writeStoreInDB()} >Registrar</Button>
        </FormContainer>
      </Container>
    </>
  )
}

export default TargetRegister