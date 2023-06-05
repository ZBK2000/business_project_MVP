import { createContext, useEffect, useState } from 'react';
import { useContext } from "react"

import {createUserWithEmailAndPassword,EmailAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup, sendEmailVerification, sendPasswordResetEmail, deleteUser, reauthenticateWithCredential, AuthCredential, reauthenticateWithPopup, getAuth} from "firebase/auth"
import {auth} from "../components/firebase"
const UserContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [user, setUser] =useState({})

    const createUser = async (email, password, nameOfUser) => {
     
          // Create the user with email and password
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
          // Set the user's display name
          await updateProfile(userCredential.user,{
            displayName: nameOfUser,
          } )
        
          await sendEmailVerification(userCredential.user)
          return userCredential.user;
       
      };

      async function passwordReset(mail, success) {
        try {
          
          await sendPasswordResetEmail(auth, mail);
          console.log('Password reset email sent successfully.');
          success(true)
        } catch (error) {
          console.error('Error sending password reset email:', error);
        }
      }
      
    async function update (user, nameOfUser){
        await updateProfile(user,{
            displayName: nameOfUser,
          } )
    }

    async function deleteUserFunc (user){
      try {
        await deleteUser(user)
        return true
      } catch (error) {
        console.log(error)
      }
      

  }


  const reauthenticateUser = async (email, password, provider) => {
    const user = auth.currentUser;
    if(provider==="password"){
      try {
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(user, credential)
        return true
      } catch (error) {
        console.log("Error", "The email or password is incorrect. Please try again.")
        return false
      }
    } else if(provider==="google.com"){
      try {
        const googleProvider = new GoogleAuthProvider();
    
       await reauthenticateWithPopup(auth.currentUser, googleProvider)
       
    
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    }


    const googleSignIn = async()=>{
        const provider = new GoogleAuthProvider()
      const result =  await signInWithPopup(auth, provider)
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            
            return user
            
             
    }  

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
           
            setUser(currentUser)
        })
        return  () => unsubscribe()
        
    }, [])

    const logout = () =>{
        return signOut(auth)
    }

    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)

    }
    return(
        <UserContext.Provider value={{createUser, user, logout, signIn, googleSignIn, update, passwordReset, deleteUserFunc, reauthenticateUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
    
  }