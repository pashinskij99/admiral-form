// ** React Imports
import { createContext, useEffect, useState } from 'react'
import SessionWeb from 'supertokens-web-js/recipe/session';

// ** Next Import
import { useRouter } from 'next/router'
import { signOut, useSessionContext } from 'supertokens-auth-react/recipe/session'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContextSuperToken = createContext(defaultProvider)

const AuthProviderSuperToken = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  let session = useSessionContext();

  let { doesSessionExist, userId, accessTokenPayload } = session;

  if (!doesSessionExist) {
    // TODO
  }

  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    setUser(null)

    // router.push('/auth')
  }

  const values = {
    user: userId ? {
      id: userId,
      fullName: 'Yaroslav',
      email: 'pashinskij99@gmail.com',
      userName: 'pashinskij99',
      role: 'admin'
    } : null,
    loading: session.loading,
    setUser,
    setLoading,
    logout: handleLogout,

  }

  return <AuthContextSuperToken.Provider value={values}>{children}</AuthContextSuperToken.Provider>
}

export { AuthContextSuperToken, AuthProviderSuperToken }
