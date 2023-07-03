import React, { useState, useEffect } from 'react'

import Header from "../../components/header"
import { FormContainer, Container, Title, TitleContainer, InputContainer } from "./styles"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { db } from '../../services/firebase'
import { doc, setDoc, getDoc } from "firebase/firestore"

import { useNavigate } from 'react-router-dom'

const UserUpdate = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const response = localStorage.getItem('@APPAuth:token')
  const token = JSON.parse(response)

  useEffect(() => {
    handleUserData();
    // eslint-disable-next-line
  }, []);

  async function handleUserData(){
    const docRef = doc(db, "users", token.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      localStorage.setItem('@APPAuth:user', JSON.stringify(docSnap.data()))
      const response = localStorage.getItem('@APPAuth:user')
      const userData = JSON.parse(response)
      setEmail(userData.email)
      setName(userData.name)
    } else {
        alert("Não foi possivel recuperar os seus dados!");
        navigate('/home')
    }
    }


  async function writeUserInDB(){
    await setDoc(doc(db, "users", token.uid), {
        name: name,
        email: email
      });
      navigate('/home')
  }

  return (
    <>
      <Header></Header>
      <Container>
        <FormContainer>
          <TitleContainer>
            <Title>Atualize seus cadastro</Title>
          </TitleContainer>
          <InputContainer>
            <TextField id="name" label="Nome" variant="standard" type='text' value={name} onChange={(event) => setName(event.target.value)} />
          </InputContainer>
          <Button variant="contained" style={{width: "70%", height: "3rem"}} onClick={() => writeUserInDB()} >Atualizar</Button>
        </FormContainer>
      </Container>
    </>
  )
}

export default UserUpdate