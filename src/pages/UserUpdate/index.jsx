import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../Contexts/Auth'

import Header from "../../components/Header/header"
import { FormContainer, Container, Title, TitleContainer, InputContainer } from "./styles"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { db } from '../../services/firebase'
import { doc, setDoc, getDoc } from "firebase/firestore"

import { useNavigate } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

const UserUpdate = () => {
  const { token } = useContext(AuthContext)

  useEffect(() => {
    handleUserData() 

    // eslint-disable-next-line
  }, [])

  const navigate = useNavigate()
  const { addToast } = useToasts()

  // eslint-disable-next-line
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  async function writeUserInDB(){
    await setDoc(doc(db, "users", token), {
        name: name,
        email: email
      }).catch((error) => {
        addToast("Não foi possivel atualizar os dados. Por favor tente novamente!", { appearance: 'error', autoDismiss: true, })
        addToast(error, { appearance: 'error', autoDismiss: true, })
      })
    navigate('/')
    addToast("Os dados foram atualizados com sucesso!", { appearance: 'success', autoDismiss: true, })
  }

  async function handleUserData(){
    if(!token){
        return
    }

    const docRef = doc(db, "users", token);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        localStorage.setItem('@APPAuth:user', JSON.stringify(docSnap.data()))
        const data = docSnap.data()
        setEmail(data.email)
        setName(data.name)
    } else {
        addToast("Não foi possível recuperar os seus dados!", { appearance: 'error', autoDismiss: true, })
        return false
    }
  }

  return (
    <>
     <Header />
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