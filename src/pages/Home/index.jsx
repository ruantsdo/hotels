import React, { useEffect, useState } from 'react'

import Header from '../../components/header'
import { Container, SearchContainer, CardsContainer, InfoContainer, 
        ContentContainer, LogoContainer, MenuContainer, Card, CardInfo, CardInfo2,
        Title, SubTitle, CardImage, InfoImage } from './styles'

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import HotelIcon from '@mui/icons-material/Hotel';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import Ilustration from '../../assets/imgs/searchPhoto.jpeg'

import { useNavigate } from 'react-router-dom'

import { auth, db } from '../../services/firebase'
import { doc, getDoc } from "firebase/firestore"
import { signOut } from "firebase/auth";

import { useToasts } from 'react-toast-notifications'


const Home = () => {
  const navigate = useNavigate()
  const { addToast } = useToasts()

  const [storage, setStorage] = useState(null)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const response = localStorage.getItem('@APPAuth:token')
  const token = JSON.parse(response)

  useEffect(() => {
    handleStoreData()
  })

  const verifyToken = () => {
    if(!token){
      return false
    }
  }

  const handleUserData = async () => {
    if(verifyToken() === false) {
      addToast("Você deve estar logado para atualizar os seus dados!", { appearance: 'info', autoDismiss: true, })
      return
    }

    navigate('/userUpdate')
  }

  const handleStoreData = async () => {
    if(verifyToken() === false) {
      return
    }

    const docRef = doc(db, "establishments", token.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setStorage(docSnap)
    }
  }

  const RedirectStoreData = async () => {
    if(verifyToken() === false) {
      addToast("Você deve estar logado para cadastrar um hotel!", { appearance: 'info', autoDismiss: true, })
      return
    }

    if (storage) {
      navigate('/targetUpdate')
    } else {
      navigate('/targetRegister')
    }
  }

  function firebaseSignOut(){
    signOut(auth).then(() => {
        localStorage.clear()
        addToast("Você escolheu sair!", { appearance: 'info', autoDismiss: true, })
    })
  }

  return (
    <Container>
      <Header>
        <LogoContainer>
          Site de Hotel
        </LogoContainer>
        <MenuContainer>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 40, height: 40 }}>M</Avatar>
          </IconButton>
          <Tooltip title="Mais opções">
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => {handleClose(); navigate('/')}} >
              <HomeIcon /> Home
            </MenuItem>
            <MenuItem onClick={() => {handleClose(); handleUserData()}}>
              <EditIcon /> Editar perfil
            </MenuItem>
            {storage ? 
            <MenuItem onClick={() => {handleClose(); RedirectStoreData()}}>
              <HotelIcon /> Atualizar hotel
            </MenuItem> 
              : 
            <MenuItem onClick={() => {handleClose(); RedirectStoreData()}}>
              <HotelIcon /> Cadastrar hotel
            </MenuItem>
            }

            <Divider />
            {token ? 
            <MenuItem onClick={() => {handleClose(); firebaseSignOut()}}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              Sair
            </MenuItem>
            :
            <MenuItem onClick={() => {handleClose(); navigate('/login')}}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              Entrar
            </MenuItem>  
          }
          </Menu>
          </Tooltip>
        </MenuContainer>
      </Header>
      <SearchContainer>
        <div style={{ textIndent: "1rem" }}>Pesquisar</div>
        <TextField
            label="Pesquisar"
            id="search"
            sx={{ m: 1, width: '50%' }}
            InputProps={{
              endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
          }}
        />
      </SearchContainer>
      <ContentContainer>
        <CardsContainer>
          <Card>
            <CardImage src={Ilustration} />
            <CardInfo>
              <Title>Nome do hotel</Title>
              <SubTitle>Cidade</SubTitle>
            </CardInfo>
            <CardInfo2>
              <Title>Vantagens</Title>
              <Title>Valor</Title>
            </CardInfo2>
          </Card>
        </CardsContainer>
        <InfoContainer>
          <InfoImage src={Ilustration} />
            <Title>Nome do hotel</Title>
            <SubTitle>Cidade</SubTitle>
            <Title>Vantagens</Title>
            <Title>Valor</Title>
        </InfoContainer>
      </ContentContainer>
    </Container>
  )
}

export default Home