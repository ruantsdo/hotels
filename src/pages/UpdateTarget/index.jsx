import React, { useEffect, useState, useContext } from 'react'
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

import { useNavigate } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

import InputMask from 'react-input-mask';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TargetUpdate = () => {
  const { token, deleteTarget } = useContext(AuthContext)

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

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    handleStoreData();
  // eslint-disable-next-line
  }, [])

  const handleStoreData = async () => {
    const docRef = doc(db, "establishments", token);
    const docSnap = await getDoc(docRef);

    if (docSnap) {
      const storeData = docSnap.data();
      setName(storeData.name);
      setCnpj(storeData.cnpj);
      setAddress(storeData.address);
      setTier(storeData.tier);
      setCharter(storeData.charter);
      setRooms(storeData.rooms);
      setBenefits(storeData.benefits);
      setValue(storeData.value)
    } else {
      addToast("Não foi possível recuperar os seus dados!", { appearance: 'error', autoDismiss: true, })
      navigate('/');
    }
  };

  const writeStoreInDB = async () => {
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
      addToast("Não foi possivel atualizar os dados. Por favor tente novamente!", { appearance: 'error', autoDismiss: true, })
      addToast(error, { appearance: 'error', autoDismiss: true, })
      return
    })
      navigate('/')
      addToast("Os dados foram atualizados com sucesso!", { appearance: 'success', autoDismiss: true, })
  }

  async function handleDeleteTarget(){
    deleteTarget().then(() => {
      navigate('/')
    })
  }


  return (
    <>
      <Header></Header>
      <Container>
        <FormContainer>
          <TitleContainer>
            <Title>Atualize os dados do seu Hotel</Title>
          </TitleContainer>
          <InputContainer>
            <TextField id="name" label="Nome" variant="standard" type='text' value={name} onChange={(event) => setName(event.target.value)} />
            <InputMask
              mask="99.999.999/9999-99"
              id="cnpj"
              label="CNPJ"
              variant="standard"
              type="text"
              value={cnpj}
              onChange={(event) => setCnpj(event.target.value)}
            >
              {(inputProps) => (
                <TextField {...inputProps} />
              )}
            </InputMask>
            <TextField id="adress" label="Endereço" variant="standard" type='text' value={address} onChange={(event) => setAddress(event.target.value)} />
            <TextField id="class" label="Classificação do hotel" variant="standard" type='number' value={tier} onChange={(event) => setTier(event.target.value)} inputProps={{ min: 1, max: 5 }}/>
            <TextField id="charter" label="Alvará de funcionamento" variant="standard" type='number' value={charter} onChange={(event) => setCharter(event.target.value)} />
            <TextField id="rooms" label="Quantidade de quartos" variant="standard" type='number' value={rooms} onChange={(event) => setRooms(event.target.value)} inputProps={{ min: 1 }} />
            <TextField id="value" label="Valor do quarto" variant="standard" type='text' value={value} onChange={(event) => setValue(event.target.value)} />
            <TextField id="benefits" label="Beneficíos" variant="standard" type='text' value={benefits} onChange={(event) => setBenefits(event.target.value)} multiline maxRows={4}/>
          </InputContainer>
          <Button variant="contained" style={{width: "70%", height: "3rem"}} onClick={() => writeStoreInDB()} >Atualizar</Button>
          <Button variant="contained" color="error" style={{width: "70%", height: "3rem"}} onClick={() => handleClickOpen()} >APAGAR HOTEL</Button>
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
            Os dados do seu hotel serão perdidos para sempre.
            ESSA AÇÃO É IRREVERSÍVEL!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => {handleClose(); handleDeleteTarget()}}>DELETAR</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TargetUpdate