import React, { useState } from 'react'

import { FormContainer, Container, Title, SubTitle, TitleContainer, InputContainer } from "./styles"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../services/firebase'

const SignIn = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const checkInputs = () => {
    if(email === "" || password === ""){
      alert("Os campos de senha devem ser preenchidos!")
      return
    }

      signInWithEmail()
};

  async function signInWithEmail(){
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const response = userCredential.user;
        localStorage.setItem('@APPAuth:token', JSON.stringify(response));
        navigate('/home')
    }).catch((error) => {
        alert(error)
    });
  }

  return (
    <>
      <Container>
        <FormContainer>
          <TitleContainer>
            <Title>Uma nova experiência em hotéis</Title>
          </TitleContainer>
          <InputContainer>
            <SubTitle style={{alignSelf: "center", marginTop: "-2rem"}} >Faça login ou <Link to={"/register"}>Cadastre-se</Link></SubTitle>
            <TextField id="email" label="Email" variant="standard" type='email' value={email} onChange={(event) => setEmail(event.target.value)} />
            <TextField id="password" label="Senha" variant="standard" type='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
          </InputContainer>
          <Button variant="contained" style={{width: "70%", height: "3rem"}} onClick={() => checkInputs()}>Entrar</Button>
        </FormContainer>
      </Container>
    </>
  )
}

export default SignIn