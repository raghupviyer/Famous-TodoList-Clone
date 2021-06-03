import { createContext, useEffect, useState } from "react"
import {firebase} from "../firebase"

export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) =>{
      setCurrentUser(user)
      setLoading(false)
    })
  }, [])

  loading && <>loading...</>
  
  return(
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  )
}