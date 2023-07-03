import React, { useState } from 'react'

import { FormContainer, Container, Title, TitleContainer, InputContainer } from "./styles"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { auth, db } from '../../services/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const checkPasswordsMatch = () => {
      if(password === "" || password2 === "" || name === "" || email === ""){
        alert("Os campos de senha devem ser preenchidos!")
        return
      } else if (password !== password2) {
        alert("As senhas são diferentes!")
        return
      }

      if(password === password2){
        resgisterWithEmail()
      }
  };

  async function resgisterWithEmail(){
    await createUserWithEmailAndPassword(auth, email, password )
    .then((userCredential) => {
        const response = userCredential.user;
        localStorage.setItem('@APPAuth:token', JSON.stringify(response));
        writeUserInDB(response, name, email);
    }
    ).catch((error) => {
        alert(error)
    })
  }

  async function writeUserInDB( response, name, email ){
    await setDoc(doc(db, "users", response.uid), {
        name: name,
        email: email,
      });
  }   

  return (
    <>
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