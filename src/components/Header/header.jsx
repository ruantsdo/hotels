import React, { useState, useEffect } from 'react'

import { Container, LogoContainer, MenuContainer } from './styles'

import { useNavigate } from 'react-router-dom'

import { auth, db } from '../../services/firebase'
import { doc, getDoc } from "firebase/firestore"
import { signOut } from "firebase/auth";

import { useToasts } from 'react-toast-notifications'

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import HotelIcon from '@mui/icons-material/Hotel';
import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Header = () => {
  const navigate = useNavigate()
  const { addToast } = useToasts()

  const [storage, setStorage] = useState(null)
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('@APPAuth:user');
    const userInfo = JSON.parse(userData);
    setUser(userInfo);
    setUserName(userInfo.name)
  }, []);

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
      addToast("Você deve estar logado para cadastrar um hotel!", { appearance: 'info', autoDismiss: true, })
      return
    }

    const docRef = doc(db, "establishments", token.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap) {
      setStorage(docSnap)
      navigate('/targetUpdate')
      return
    }

    navigate('/targetRegister')
  }

  function firebaseSignOut(){
    signOut(auth).then(() => {
        localStorage.clear()
        setUser(null)
        setStorage(null)
        addToast("Você escolheu sair!", { appearance: 'info', autoDismiss: true, })
    })

    navigate('/')
  }

  return(
    <Container>
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
            <Avatar sx={{ width: '2.5rem', height: '2.5rem' }}>{userName ? userName.charAt(0) : 'C'}</Avatar>
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
                overflow: 'auto',
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
              {user ? 
                <MenuItem >
                  <AccountBoxIcon /> Olá, {userName}
                </MenuItem>
              :  
                <MenuItem >
                  <AccountBoxIcon /> Convidado
                </MenuItem>
              }
              <Divider />
              <MenuItem onClick={() => {handleClose(); navigate('/')}} >
                <HomeIcon /> Home
              </MenuItem>
              <MenuItem onClick={() => {handleClose(); handleUserData()}}>
                <EditIcon /> Editar perfil
              </MenuItem>
            {storage ? 
              <MenuItem onClick={() => {handleClose(); handleStoreData()}}>
                <HotelIcon /> Cadastrar hotel
              </MenuItem> 
                : 
              <MenuItem onClick={() => {handleClose(); handleStoreData()}}>
                <HotelIcon /> Atualizar hotel
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
    </Container>
  )
}

export default Header