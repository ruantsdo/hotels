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
  const [benefits, setBenefits] = useState("")
  const [value, setValue] = useState("")

  async function writeStoreInDB(){
    if(name === "" || cnpj === "" || address === "" || tier === "" || charter === "" || rooms === "" || benefits === "" ||value === ""){
      addToast("Todos os campos são obrigatórios.", { appearance: 'info', autoDismiss: true })
      return
    }

    if (tier < 1 || tier > 5) {
      addToast("A classificação do hotel deve estar entre 1 e 5.", { appearance: 'info', autoDismiss: true })
      return
    }

    await setDoc(doc(db, "establishments", token), {
      owner: token,
      name: name,
      address: address,
      tier: tier,
      cnpj: cnpj,
      charter: charter,
      rooms: rooms,
      benefits: benefits,
      value: value
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
            <TextField id="class" label="Classificação do hotel" variant="standard" type='number' value={tier} onChange={(event) => setTier(event.target.value)} inputProps={{ min: 1, max: 5 }}/>
            <TextField id="charter" label="Alvará de funcionamento" variant="standard" type='number' value={charter} onChange={(event) => setCharter(event.target.value)} />
            <TextField id="rooms" label="Quantidade de quartos" variant="standard" type='number' value={rooms} onChange={(event) => setRooms(event.target.value)} inputProps={{ min: 1 }} />
            <TextField id="value" label="Valor do quarto" variant="standard" type='text' value={value} onChange={(event) => setValue(event.target.value)} />
            <TextField id="benefits" label="Beneficíos" variant="standard" type='text' value={benefits} onChange={(event) => setBenefits(event.target.value)} multiline maxRows={4}/>
          </InputContainer>
          <Button variant="contained" style={{width: "70%", height: "3rem"}} onClick={() => writeStoreInDB()} >Registrar</Button>
        </FormContainer>
      </Container>
    </>
  )
}

export default TargetRegister