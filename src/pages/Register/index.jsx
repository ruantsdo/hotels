import React, { useState } from 'react'

import { FormContainer, Container, Title, TitleContainer, InputContainer } from "./styles"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { auth, db } from '../../services/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"

import { useToasts } from 'react-toast-notifications'

import { useNavigate } from "react-router-dom";

const Register = () => {
  const { addToast } = useToasts()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [token, setToken ] = useState(null)

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
        resgisterWithEmail()
      }
  };

  async function resgisterWithEmail(){
    await createUserWithEmailAndPassword(auth, email, password )
    .then((userCredential) => {
        setToken(userCredential.user)
        localStorage.setItem('@APPAuth:token', JSON.stringify(token))
        writeUserInDB(token, name, email)
    }).catch((error) => {
        addToast("Não foi possivel criar a sua conta. Por favor tente novamente!", { appearance: 'error', autoDismiss: true, })
        addToast(error , { appearance: 'error', autoDismiss: true, })
    })

    const docRef = doc(db, "users", token);
    const docSnap = getDoc(docRef);

    if (docSnap.exists()) {
      localStorage.setItem('@APPAuth:user', JSON.stringify(docSnap))
    }

    navigate('/')
  }

  async function writeUserInDB( token, name, email ){
    await setDoc(doc(db, "users", token), {
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