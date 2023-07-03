import React, { createContext, useState } from "react";

//Firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from '../services/firebase'
import { doc, setDoc, getDoc } from "firebase/firestore"
//import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AuthContext = createContext({ signed: true })

export const AuthProvider = ({ children }) => {
    // eslint-disable-next-line
    const [user, setUser] = useState(null)
    // eslint-disable-next-line
    const [token, setToken] = useState(null)

    /*async function loadStoragedData(){
        const storagedToken = await AsyncStorage.getItem('@APPAuth:token')
        const storagedUser = await AsyncStorage.getItem('@APPAuth:user')

        if(storagedToken && storagedUser){
            setToken(JSON.parse(storagedToken))
            setUser(JSON.parse(storagedUser))
        }
        setLoading(false)
    }*/

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
            /*AsyncStorage.clear().then(()=>{
                setUser(null)
                setToken(null)
            })*/
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

    return(
        <AuthContext.Provider 
            value={{
                
                user,
                token,
                signInWithEmail, 
                resgisterWithEmail, 
                firebaseSignOut,
                writeUserInDB,
                writeStoreInDB,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider