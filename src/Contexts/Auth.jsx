import React, { createContext, useState, useEffect } from "react";

import { useToasts } from 'react-toast-notifications'

//Firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { db } from '../services/firebase'
import { deleteDoc, doc, setDoc, getDoc } from "firebase/firestore"
import { getAuth, deleteUser, updateProfile } from "firebase/auth";

//import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser ] = useState(null)
    const [token, setToken] = useState(null)

    const { addToast } = useToasts()

    const auth = getAuth();
    const currentUser = auth.currentUser;

    useEffect(() =>{
        updateInfo()
    }, [])

    async function updateInfo(){
        setUser(JSON.parse(localStorage.getItem('@APPAuth:user')))
        setToken(JSON.parse(localStorage.getItem('@APPAuth:token')))  
    }

    async function registerWithEmail( name, email, password ){
        await createUserWithEmailAndPassword( auth, email, password )
        .then((userCredential) => {
            const response = userCredential.user
            localStorage.setItem('@APPAuth:token', JSON.stringify(response.uid))
            setToken(response.uid)
            writeUserInDB(response.uid, name, email).then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name
                })
            })
        }).catch((error) => {
            addToast("Não foi possivel criar a sua conta. Por favor tente novamente!", { appearance: 'error', autoDismiss: true, })
            addToast(error , { appearance: 'error', autoDismiss: true, })
        })
    }
    
    async function writeUserInDB(response, name, email ){
        await setDoc(doc(db, "users", response), {
            name: name,
            email: email,
            });

            const docRef = doc(db, "users", response);
            const docSnap = getDoc(docRef);

        if (docSnap) {
            localStorage.setItem('@APPAuth:user', JSON.stringify(docSnap))
            setUser(JSON.parse(localStorage.getItem('@APPAuth:user')))
        }
    }  

    function firebaseSignOut(){
        signOut(auth).then(() => {
            localStorage.clear()
            setUser(null)
            setToken(null)
            addToast("Você foi desconectado!", { appearance: 'info', autoDismiss: true, placement: 'top-center'})
        }).then(() => {
            setTimeout(() => {   
            }, 1000);
        })
    }

    async function signInWithEmail(email, password){
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const response = userCredential.user;
            localStorage.setItem('@APPAuth:token', JSON.stringify(response.uid))
            setToken(response.uid)

                const docRef = doc(db, "users", response.uid);
                const docSnap = getDoc(docRef);

                if (docSnap) {
                    localStorage.setItem('@APPAuth:user', JSON.stringify(docSnap))
                    setUser(JSON.parse(localStorage.getItem('@APPAuth:user')))
                }  
        }).catch((error) => {
            addToast("As credênciais fornecidas estão incorretas. Por favor tente novamente!", { appearance: 'warning', autoDismiss: true, }) 
            return
        });
    }

    async function handleUserData(){
        if(!token){
            return
        }

        const docRef = doc(db, "users", token);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            localStorage.setItem('@APPAuth:user', JSON.stringify(docSnap.data()))
            setUser(JSON.parse(localStorage.getItem('@APPAuth:user')))
        } else {
            addToast("Não foi possível recuperar os seus dados!", { appearance: 'error', autoDismiss: true, })
            return false
        }
    }

    async function deleteTarget(){
        try {
          await deleteDoc(doc(db, "establishments", token))
          addToast("Os dados foram deletados!", { appearance: 'success', autoDismiss: true, })     
        } catch (error) {
          addToast("Não foi possivel deletar os dados. Por favor tente novamente!", { appearance: 'error', autoDismiss: true, })
        }
    }

    async function deleteCurrentUser(){
        deleteUser(currentUser).then(() => {
        try {
                deleteDoc(doc(db, "establishments", token))
                deleteDoc(doc(db, "users", token))
            } catch (error) {
                addToast("Não foi possivel deletar os dados. Por favor tente novamente!", { appearance: 'error', autoDismiss: true, })
                return
            }

            firebaseSignOut()
    
            addToast("O usuário foi deletado com sucesso!", { appearance: 'success', autoDismiss: true, })
        }).catch((error) => {
          addToast("Não foi possível deletar o seu usuário! Tente novamente mais tarde!", { appearance: 'error', autoDismiss: true, })
        });
    }

/*
    // eslint-disable-next-line
    const [user, setUser] = useState(null)
    // eslint-disable-next-line
    const [token, setToken] = useState(null)

    async function loadStoragedData(){
        const storagedToken = await AsyncStorage.getItem('@APPAuth:token')
        const storagedUser = await AsyncStorage.getItem('@APPAuth:user')

        if(storagedToken && storagedUser){
            setToken(JSON.parse(storagedToken))
            setUser(JSON.parse(storagedUser))
        }
        setLoading(false)
    }

    async function signInWithEmail( email , password ){
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const response = userCredential.user;
            //AsyncStorage.setItem('@APPAuth:token', JSON.stringify(response))
            handleUserData(response)
        }).catch((error) => {
            console.log(error)
        });
    }

    async function resgisterWithEmail( name, email, password ){
        await createUserWithEmailAndPassword(auth, email, password )
        .then((userCredential) => {
            const response = userCredential.user;
            //AsyncStorage.setItem('@APPAuth:token', JSON.stringify(response))
            
            writeUserInDB(response, name, email);
            //handleUserData(response)
        }
        ).catch((error) => {
            console.log(error)
        })
    }

    function firebaseSignOut(){
        signOut(auth).then(() => {
            AsyncStorage.clear().then(()=>{
                setUser(null)
                setToken(null)
            })
          }).catch((error) => {
            console.log("Erro no signout: ", error)
          });
    }

    async function writeUserInDB( response, name, email ){
        await setDoc(doc(db, "users", response.uid), {
            name: name,
            email: email,
          });
    }

    async function writeStoreInDB( name, address, tier, cnpj, charter, rooms ){
            await setDoc(doc(db, "establishments", token.uid), {
            owner: token.uid,
            name: name,
            address: address,
            tier: tier,
            cnpj: cnpj,
            charter: charter,
            rooms: rooms,
        })
    }

    async function handleUserData(response){
        const docRef = doc(db, "users", response.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            //AsyncStorage.setItem('@APPAuth:user', JSON.stringify(docSnap.data()))
            //loadStoragedData()
            console.log("O documento foi salvo com exito!!!")
        } else {
            console.log("Erro ao carregar os seus dados");
        }
        
    }
*/

    return(
        <AuthContext.Provider 
            value={{
                user,
                setUser,
                token,
                setToken,
                registerWithEmail,
                firebaseSignOut,
                signInWithEmail,
                handleUserData,
                updateInfo,
                deleteTarget,
                deleteCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext