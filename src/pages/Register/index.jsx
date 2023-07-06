import React, { useContext, useState } from 'react'
import AuthContext from '../../Contexts/Auth'

import { FormContainer, Container, Title, TitleContainer, InputContainer } from "./styles"

import Header from '../../components/Header/header';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useToasts } from 'react-toast-notifications'

import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerWithEmail } = useContext(AuthContext)

  const { addToast } = useToasts()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const checkPasswordsMatch = () => {
      if(password === "" || password2 === "" || name === "" || email === ""){
        addToast("Todos os campos são obrigatórios!", { appearance: 'warning', autoDismiss: true, })
        return
      } else if (password !== password2) {
        addToast("As senhas são diferentes!", { appearance: 'warning', autoDismiss: true, })
        return
      } else if (password.length < 6 || password2 < 6 ) {
        addToast("A senha deve ter pelo menos 6 caracteres!", { appearance: 'info', autoDismiss: true, })
        return
      }

      if(password === password2){
        createUser()
      }
  };

  async function createUser(){
    await registerWithEmail(name, email, password)

    navigate('/')
  } 

  return (
    <>
      <Header />
      <Container>
        <FormContainer>
          <TitleContainer>
            <Title>Cadastro</Title>
          </TitleContainer>
          <InputContainer>
            <TextField id="name" label="Nome" variant="standard" type='text' value={name} onChange={(event) => setName(event.target.value)}/>
            <TextField id="email" label="Email" variant="standard" type='email' value={email} onChange={(event) => setEmail(event.target.value)} />
            <TextField id="password" label="Senha" variant="standard" type='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
            <TextField id="password" label="Confirmar Senha" variant="standard" type='password' value={password2} onChange={(event) => setPassword2(event.target.value)}/>
          </InputContainer>
          <Button variant="contained" style={{width: "70%", height: "3rem"}} onClick={() => checkPasswordsMatch()} >Cadastrar</Button>
        </FormContainer>
      </Container>
    </>
  )
}

export default Register