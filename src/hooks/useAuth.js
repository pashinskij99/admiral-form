import { useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import { AuthContextSuperToken } from 'src/context/AuthContextSuperToken'

export const useAuth = () => useContext(AuthContext)

export const useAuthSuperToken = () => useContext(AuthContextSuperToken)
