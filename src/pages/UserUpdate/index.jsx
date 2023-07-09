import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../Contexts/Auth'

import Header from "../../components/Header/header"
import { FormContainer, Container, Title, TitleContainer, InputContainer } from "./styles"


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { db } from '../../services/firebase'
import { doc, setDoc, getDoc } from "firebase/firestore"
import { getAuth, updateProfile } from "firebase/auth";


import { useNavigate } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserUpdate = () => {
  const { token, deleteCurrentUser } = useContext(AuthContext)

  const [open, setOpen] = React.useState(false);

  const auth = getAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleUserData() 
  })

  const navigate = useNavigate()
  const { addToast } = useToasts()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  async function writeUserInDB(){
    await setDoc(doc(db, "users", token), {
        name: name,
        email: email
      }).catch((error) => {
        addToast("Não foi possivel atualizar os dados. Por favor tente novamente!", { appearance: 'error', autoDismiss: true, })
        addToast(error, { appearance: 'error', autoDismiss: true, })
      }).then(() => {
        updateProfile(auth.currentUser, {
          displayName: name
        }).then(() => {
          addToast("Os dados foram atualizados com sucesso!", { appearance: 'success', autoDismiss: true, })
          navigate('/')
        })
      }) 
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

  const handleDeleteUser = async () => {
    await deleteCurrentUser().then(() => {
      setTimeout(() => {
        navigate('/')
      }, 1000);
    })
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
          <Button variant="contained" color="error" style={{width: "70%", height: "3rem"}} onClick={() => handleClickOpen()} >DELETAR USUÁRIO</Button>
        </FormContainer>
      </Container>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Tem certeza disso?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Os seus dados de usuário e os dados do seu hotel (caso tenha algum) serão perdidos para sempre.
            ESSA AÇÃO É IRREVERSÍVEL!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => {handleClose() ; handleDeleteUser()}}>DELETAR</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserUpdate