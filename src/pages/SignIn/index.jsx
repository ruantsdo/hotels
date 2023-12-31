import React, { useContext, useState } from 'react'
import AuthContext from '../../Contexts/Auth';

import { FormContainer, Container, Title, SubTitle, TitleContainer, InputContainer } from "./styles"

import Header from '../../components/Header/header';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { Link, useNavigate } from "react-router-dom";

import { useToasts } from 'react-toast-notifications'

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../services/firebase'
import { doc, getDoc } from "firebase/firestore"


const SignIn = () => {
  const { updateInfo } = useContext(AuthContext)

  const navigate = useNavigate()
  const { addToast } = useToasts()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const checkInputs = () => {
    if(email === "" || password === ""){
      addToast("Todos os campos são obrigatórios!", { appearance: 'warning', autoDismiss: true, })
      return
    }

    signInWithEmail()
  }

  async function signInWithEmail(){
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const response = userCredential.user;
        localStorage.setItem('@APPAuth:token', JSON.stringify(response.uid))

            const docRef = doc(db, "users", response.uid);
            const docSnap = getDoc(docRef);

            if (docSnap) {
                localStorage.setItem('@APPAuth:user', JSON.stringify(docSnap))
            }

            updateInfo()

            navigate('/')
    }).catch((error) => {
        addToast("As credênciais fornecidas estão incorretas. Por favor tente novamente!", { appearance: 'warning', autoDismiss: true, }) 
        return
    })
  }

  return (
    <>
      <Header />
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