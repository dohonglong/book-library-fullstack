import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { AppState } from '../redux/store'

type AuthenticatedProps = {
  children: React.ReactNode
}

function Authenticated({ children }: AuthenticatedProps) {
  const isAuthenticated = useSelector(
    (state: AppState) => state.auth.isAuthenticated
  )

  return <>{isAuthenticated ? children : <Navigate replace to='/login' />}</>
}

export default Authenticated
